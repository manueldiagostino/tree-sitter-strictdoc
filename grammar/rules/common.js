const REGEX_UID_PATTERN = /[\w]+[\w()\-\/\.:_]*/;

module.exports = {
  reserved_keyword: () =>
    choice("DOCUMENT", "GRAMMAR", "SECTION", "DOCUMENT_FROM_FILE"),

  single_line_string: ($) => /[^\s][^\n\r]*/,
  multi_line_string: ($) =>
    seq(">>>", "\n", field("text_part", $.text_part), "^<<<"),

  text_part: ($) =>
    choice(
      $.anchor,
      // TODO: inline_link
      // TODO: normal_string
    ),

  anchor: ($) =>
    seq(
      "[ANCHOR: ",
      field("value", $.uid_string),
      optional(seq(",", field("title", /\w+[\s\w+]*/))),
      "]",
      choice("\Z", "\n"),
    ),

  uid_string: ($) => REGEX_UID_PATTERN,
  field_name: ($) => /[A-Z][_A-Z0-9]*/,
  boolean_choice: () => choice("True", "False"),
  new_line: ($) => "\n",
  _eof: ($) => "\0",
};
