export {}

/**
 * 1. Get operator map
 *      GET /{datasetId}/filters/operators
 *      -> map of type <-> operators
 *          {
 *              string: [=, !=, ~=],
 *              number: [>, <, between, =, !=, >=, <=]
 *          }
 *
 * 2. Get key suggestions
 *      GET /{datasetId}/filters/keys
 *      -> arrays of objects
 *          [
 *              {
 *                  groupKey: 'group1',
 *                  groupName: 'Group 1',
 *                  keys: [
 *                       { key: 'key1', name: 'Key 1', type: string },
 *                  ]
 *              }
 *          ]
 *
 * 2. Get value suggestions
 *      GET /{datasetId}/filters/{key}/{operator}/values
 *      -> array of objects
 *          [
 *              { key: 'value1', name: 'Value 1' },
 *              { key: 'value2', name: 'Value 2' },
 *              { key: 'value3', name: 'Value 3' },
 *          ]
 *
 * Filter Operator Types
 *      1. STRING
 *          operators: =, !=, ~=
 *      2. NUMBER
 *          operators: >, <, between, =, !=, >=, <=
 *      3. BOOLEAN
 *          operators: is
 *      4. TIMESTAMP (?)
 *
 */
