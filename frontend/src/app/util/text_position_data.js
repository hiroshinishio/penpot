/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) UXBOX Labs SL
 */

"use strict";

goog.provide("app.util.text_position_data");

goog.scope(function () {
  const self = app.util.text_position_data;
  const document = goog.global.document;

  function getRangeRects(node, start, end) {
    const range = document.createRange();
    range.setStart(node, start);
    range.setEnd(node, end);
    return range.getClientRects();
  }

  self.parse_text_nodes = function(parent, textNode) {
    const content = textNode.textContent;
    const textSize = content.length;

    let from = 0;
    let to = 0;
    let current = "";
    let result = [];
    let prevRect = null;

    while (to < textSize) {
      const rects = getRangeRects(textNode, from, to + 1);

      if (rects.length > 1) {
        const position = prevRect;

        result.push({
          node: parent,
          position: position,
          text: current
        });

        from = to;
        current = "";

      } else {
        prevRect = rects[0];
        current += content[to];
        to = to + 1;
      }
    }

    // to == textSize
    const rects = getRangeRects(textNode, from, to);
    result.push({node: parent, position: rects[0], text: current});
    return result;
  };
});