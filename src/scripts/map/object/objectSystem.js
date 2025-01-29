// import { DOMUtils } from "../utils/domUtils.js";

// export class ObjectSystem {
//   static updateObjectsList(objects) {
//     DOMUtils.clearAndPopulateList(
//       "#objectsList",
//       objects.flatMap(object =>
//         Array(object.quantity).fill(null).map((_, i) =>
//           DOMUtils.createListItem(
//             object.name,
//             [
//               DOMUtils.createButton("互動", () => console.log(`與 ${object.name} (${i + 1}) 互動`))
//             ]
//           )
//         )
//       )
//     );
//   }
// }
