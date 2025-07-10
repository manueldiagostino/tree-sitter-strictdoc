module.exports = {
  boolean_choice: () => choice("True", "False"),

  choice_option: () => field("option", token(/[\w\/-]+/)),

  requirement_type: ($) => /[A-Z]+[_A-Z]*/,

  reference: ($) =>
    choice($.parent_req_reference, $.child_req_reference, $.file_reference),

  parent_req_reference: ($) =>
    seq(
      "-",
      " ",
      "TYPE",
      ":",
      " ",
      "Parent",
      "\n",
      "  ",
      "VALUE",
      ":",
      " ",
      field("ref_uid", $.req_reference_value_id),
      "\n",
      optional(seq("  ", "ROLE", ":", " ", field("role", $.role_id), "\n")),
    ),

  child_req_reference: ($) =>
    seq(
      "-",
      " ",
      "TYPE",
      ":",
      " ",
      "Child",
      "\n",
      "  ",
      "VALUE",
      ":",
      " ",
      field("ref_uid", $.req_reference_value_id),
      "\n",
      optional(seq("  ", "ROLE", ":", " ", field("role", $.role_id), "\n")),
    ),

  req_reference_value_id: ($) => token(/.*/),

  file_reference: ($) =>
    seq(
      "-",
      " ",
      "TYPE",
      ":",
      " ",
      "File",
      "\n",
      optional(seq("  ", "ROLE", ":", " ", field("role", $.role_id), "\n")),
      field("g_file_entry", $.file_entry),
    ),

  role_id: ($) => token(/.+/),

  file_entry: ($) =>
    seq(
      optional(
        seq(
          "  ",
          "FORMAT",
          ":",
          " ",
          field("g_file_format", $.file_entry_format),
          "\n",
        ),
      ),
      "  ",
      "VALUE",
      ":",
      " ",
      field("g_file_path", /.*/),
      "\n",
      optional(
        seq("  ", "LINE_RANGE", ":", " ", field("g_line_range", /.*/), "\n"),
      ),
      optional(seq("  ", "FUNCTION", ":", " ", field("function", /.*/), "\n")),
      optional(seq("  ", "CLASS", ":", " ", field("clazz", /.*/), "\n")),
    ),

  file_entry_format: () => choice("Sourcecode", "Python", /[A-Z]+[A-Z_]*/),
};
