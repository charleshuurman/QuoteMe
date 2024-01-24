import { wrap } from "optimism";
import { Kind, visit } from "graphql";
import { ApolloLink } from "../core/index.js";
import { stripTypename, isPlainObject } from "../../utilities/index.js";
export var KEEP = "__KEEP";
export function removeTypenameFromVariables(options) {
    if (options === void 0) { options = Object.create(null); }
    return new ApolloLink(function (operation, forward) {
        var except = options.except;
        var query = operation.query, variables = operation.variables;
        if (variables) {
            operation.variables =
                except ?
                    maybeStripTypenameUsingConfig(query, variables, except)
                    : stripTypename(variables);
        }
        return forward(operation);
    });
}
function maybeStripTypenameUsingConfig(query, variables, config) {
    var variableDefinitions = getVariableDefinitions(query);
    return Object.fromEntries(Object.entries(variables).map(function (keyVal) {
        var key = keyVal[0], value = keyVal[1];
        var typename = variableDefinitions[key];
        var typenameConfig = config[typename];
        keyVal[1] =
            typenameConfig ?
                maybeStripTypename(value, typenameConfig)
                : stripTypename(value);
        return keyVal;
    }));
}
function maybeStripTypename(value, config) {
    if (config === KEEP) {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map(function (item) { return maybeStripTypename(item, config); });
    }
    if (isPlainObject(value)) {
        var modified_1 = {};
        Object.keys(value).forEach(function (key) {
            var child = value[key];
            if (key === "__typename") {
                return;
            }
            var fieldConfig = config[key];
            modified_1[key] =
                fieldConfig ?
                    maybeStripTypename(child, fieldConfig)
                    : stripTypename(child);
        });
        return modified_1;
    }
    return value;
}
var getVariableDefinitions = wrap(function (document) {
    var definitions = {};
    visit(document, {
        VariableDefinition: function (node) {
            definitions[node.variable.name.value] = unwrapType(node.type);
        },
    });
    return definitions;
});
function unwrapType(node) {
    switch (node.kind) {
        case Kind.NON_NULL_TYPE:
            return unwrapType(node.type);
        case Kind.LIST_TYPE:
            return unwrapType(node.type);
        case Kind.NAMED_TYPE:
            return node.name.value;
    }
}
//# sourceMappingURL=removeTypenameFromVariables.js.map