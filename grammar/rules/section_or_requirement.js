module.exports = {
  section_or_requirement_list: ($) => repeat1($.section_or_requirement),

  section_or_requirement: ($) =>
    seq(
      $._newline,
      choice(
        $.sdoc_node,
        $.sdoc_section,
        $.document_from_file,
        $.sdoc_composite_node,
      ),
    ),

  sdoc_section: ($) =>
    seq("[SECTION]", "\n", $.section_body, "[/SECTION]", "\n"),

  section_body: ($) =>
    seq(
      optional(seq("MID", ":", " ", field("mid", $.single_line_string), "\n")),
      optional(seq("UID", ":", " ", field("uid", $.uid_string), "\n")),
      optional(
        seq(
          "LEVEL",
          ":",
          " ",
          field("custom_level", $.single_line_string),
          "\n",
        ),
      ),
      "TITLE",
      ":",
      " ",
      field("title", $.single_line_string),
      "\n",
      optional(
        seq(
          choice(seq("PREFIX", ":", " "), seq("REQ_PREFIX", ":", " ")),
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
      "FILE",
      ":",
      " ",
      field("path", $.file_path),
      "\n",
    ),

  sdoc_node: ($) =>
    seq(
      $.sdoc_node_opening,
      repeat(field("fields", $.sdoc_node_field)),
      optional(
        seq("RELATIONS", ":", "\n", repeat(field("relations", $.reference))),
      ),
    ),

  sdoc_node_opening: ($) =>
    seq("[", field("node_type", $.sdoc_node_type_name), "]", $._newline),

  sdoc_node_type_name: ($) => $.requirement_type,

  sdoc_composite_node: ($) =>
    seq(
      $.sdoc_composite_node_opening,
      repeat1($.sdoc_node_field),
      optional(seq("RELATIONS", ":", "\n", repeat1($.reference))),
      optional(
        field("section_and_requirement_list", $.section_or_requirement_list),
      ),
      $._newline,
      $.sdoc_composite_node_closing,
    ),

  sdoc_composite_node_opening: ($) =>
    seq(
      "[[",
      field("node_type_opening", $.sdoc_composite_node_type_name),
      "]]",
      $._newline,
    ),

  sdoc_composite_node_closing: ($) =>
    seq(
      "[[/",
      field("node_type_closing", $.sdoc_composite_node_type_name),
      "]]",
      $._newline,
    ),

  sdoc_composite_node_type_name: ($) => $.requirement_type,

  sdoc_node_field: ($) =>
    choice(
      $.sdoc_node_field_mid,
      $.sdoc_node_field_uid,
      $.sdoc_node_field_generic,
    ),

  sdoc_node_field_mid: ($) =>
    seq("MID", ":", " ", field("mid", $.single_line_string), "\n"),
  sdoc_node_field_uid: ($) =>
    seq("UID", ":", " ", field("uid", $.uid_string), "\n"),
  sdoc_node_field_generic: ($) =>
    seq(
      field("field_name", $.field_name),
      ":",
      " ",
      choice($.single_line_text_part, $.multi_line_string),
    ),

  requirement_status: () => choice("Draft", "Active", "Deleted"),
};
