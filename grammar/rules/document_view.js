module.exports = {
  document_view: ($) => seq("VIEWS", ":", "\n", repeat1($.view_element)),

  view_element: ($) =>
    seq(
      "-",
      " ",
      "ID",
      ":",
      " ",
      field("id", $.uid_string),
      "\n",
      optional(
        seq("  ", "NAME", ":", " ", field("name", $.single_line_string), "\n"),
      ),
      "  ",
      "TAGS",
      ":",
      "\n",
      repeat1($.view_element_tag),
      optional(
        seq("  ", "HIDDEN_TAGS", ":", "\n", repeat1($.view_element_hidden_tag)),
      ),
    ),

  view_element_tag: ($) =>
    seq(
      "  ",
      "-",
      " ",
      "OBJECT_TYPE",
      ":",
      " ",
      field("object_type", $.single_line_string),
      "\n",
      "    ",
      "VISIBLE_FIELDS",
      ":",
      "\n",
      repeat1($.view_element_field),
    ),

  view_element_field: ($) =>
    seq(
      "    ",
      "-",
      " ",
      "NAME",
      ":",
      " ",
      field("name", $.single_line_string),
      "\n",
      optional(
        seq(
          "      ",
          "PLACEMENT",
          ":",
          " ",
          field("placement", $.single_line_string),
          "\n",
        ),
      ),
    ),

  view_element_hidden_tag: ($) =>
    seq("  ", "-", " ", field("hidden_tag", $.single_line_string), "\n"),
};
