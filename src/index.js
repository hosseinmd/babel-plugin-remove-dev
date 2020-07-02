import { declare } from "@babel/helper-plugin-utils";

export default declare((api) => {
  api.assertVersion(7);

  return {
    name: "remove-dev",
    visitor: {
      Program(path) {
        // On program start, do an explicit traversal up front for this plugin.
        if (process.env.NODE_ENV !== "production") {
          return;
        }

        path.traverse({
          IfStatement(path) {
            const {
              node: { test },
              node,
            } = path;
            if (test.name === "__DEV__" && !node.alternate) {
              path.remove();

              return;
            }

            if (isProcessEnvNODE_ENV(test.left)) {
              if (isRunOnDev(test.operator, test.right)) {
                path.remove();

                return;
              }
            }

            if (isProcessEnvNODE_ENV(test.right)) {
              if (isRunOnDev(test.operator, test.left)) {
                path.remove();

                return;
              }
            }
          },
        });
      },
    },
  };
});

function isProcessEnvNODE_ENV(leftOrRight) {
  if (leftOrRight && leftOrRight.type === "MemberExpression") {
    if (leftOrRight.object.type === "MemberExpression") {
      if (leftOrRight.object.object.name === "process") {
        if (leftOrRight.object.property.name === "env") {
          if (leftOrRight.property.name === "NODE_ENV") {
            return true;
          }
        }
      }
    }
  }
  return false;
}

function isRunOnDev(operator, leftOrRight) {
  if (!leftOrRight) {
    return false;
  }

  if (leftOrRight.value === "production" && operator === "!==") {
    return true;
  }

  if (leftOrRight.value === "development" && operator === "===") {
    return true;
  }

  return false;
}
