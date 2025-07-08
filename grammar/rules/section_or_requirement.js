module.exports = {
  section_or_requirement_list: ($) => repeat1($.section_or_requirement),

  section_or_requirement: ($) =>
    seq(
      "\n",
      choice(
        $.sdoc_section,
        // $.sdoc_composite_node,
        // $.sdoc_node,
        $.document_from_file,
      ),
    ),

  sdoc_section: ($) =>
    seq("[SECTION]", "\n", $.section_body, "[/SECTION]", "\n"),

  section_body: ($) =>
    seq(
      optional(seq("MID: ", field("mid", $.single_line_string), "\n")),
      optional(seq("UID: ", field("uid", $.uid_string), "\n")),
      optional(
        seq("LEVEL: ", field("custom_level", $.single_line_string), "\n"),
      ),
      "TITLE: ",
      field("title", $.single_line_string),
      "\n",
      optional(
        seq(
          choice("PREFIX: ", "REQ_PREFIX: "),
          field("requirement_prefix", $.single_line_string),
          "\n",
        ),
      ),
      repeat($.section_or_requirement),
      "\n",
    ),

  document_from_file: ($) =>
    seq(
      "[DOCUMENT_FROM_FILE]",
      "\n",
      "FILE: ",
      field("path", $.single_line_string),
      "\n",
    ),

  //
  // sdoc_node: ($) =>
  //   seq(
  //     "[",
  //     prec.right(1, field("node_type", $.requirement_type)),
  //     "]",
  //     "\n",
  //     repeat(field("fields", $.sdoc_node_field)),
  //     optional(
  //       seq("RELATIONS:", "\n", repeat(field("relations", $.reference))),
  //     ),
  //   ),
  //

  // sdoc_composite_node: ($) =>
  //   seq(
  //     "[[",
  //     field("node_type", $.requirement_type),
  //     "]]",
  //     "\n",
  //     repeat1($.sdoc_node_field),
  //     optional(seq("RELATIONS:", "\n", repeat1($.reference))),
  //     optional(
  //       field("section_and_requirement_list", $.section_or_requirement_list),
  //     ),
  //     "\n",
  //     "[[/",
  //     field("node_type_close", $.requirement_type),
  //     "]]",
  //     "\n",
  //   ),
  //
  // sdoc_node_field: ($) =>
  //   choice(
  //     seq(
  //       field("field_name", "MID"),
  //       ": ",
  //       field("parts", $.single_line_string),
  //       "\n",
  //     ),
  //     seq(field("field_name", "UID"), ": ", field("parts", $.uid_string), "\n"),
  //     seq(
  //       field("field_name", $.field_name),
  //       ":",
  //       choice(
  //         seq(" ", repeat1($.single_line_text_part), "\n"),
  //         seq(
  //           " ",
  //           field("multiline", ">>>\n"),
  //           repeat1($.text_part),
  //           "<<<",
  //           "\n",
  //         ),
  //       ),
  //     ),
  //   ),
  //
  // requirement_status: () => choice("Draft", "Active", "Deleted"),
};
