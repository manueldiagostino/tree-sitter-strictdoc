const REGEX_UID = /([\w]+[\w()\-\/.: ]*)/;

module.exports = {
  reserved_keyword: () =>
    choice("DOCUMENT", "GRAMMAR", "SECTION", "DOCUMENT_FROM_FILE"),

  single_line_string: ($) => /[^\s][^\n\r]*/,
  multi_line_string: ($) => seq(">>>\n", $.text_part, "<<<"),

  text_part: ($) =>
    prec.left(
      repeat1(
        choice(
          $.anchor,
          seq(
            optional($.inline_link),
            choice($.normal_string, $.exception_symbol),
          ),
        ),
      ),
    ),

  single_line_text_part: ($) =>
    choice($.anchor, $.inline_link, token(seq(/[^\s]/, /[^\n]*/))),

  normal_string: ($) => /[^<\[]+/,
  exception_symbol: ($) => /[<\[]/,

  inline_link: ($) => seq("[LINK: ", field("value", REGEX_UID), "]"),

  anchor: ($) =>
    seq(
      "[ANCHOR: ",
      field("value", $.uid_string),
      optional(seq(",", field("title", /\w+[\s\w+]*/))),
      "]",
      choice("\Z", "\n"),
    ),

  uid_string: ($) => REGEX_UID,
  field_name: ($) => /[A-Z][_A-Z0-9]*/,
  boolean_choice: () => choice("True", "False"),
  _new_line: ($) => "\n",
  _eof: ($) => "\0",
};
