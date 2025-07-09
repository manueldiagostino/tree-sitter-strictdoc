const REGEX_UID = /([\w]+[\w()\-\/.: ]*)/;

module.exports = {
  reserved_keyword: () =>
    choice("DOCUMENT", "GRAMMAR", "SECTION", "DOCUMENT_FROM_FILE"),

  single_line_string: ($) => /[^\s][^\n\r]*/,
  multi_line_string: ($) => seq(">>>\n", $.text_part, "<<<"),

  anchor: ($) =>
    seq(
      "[ANCHOR: ",
      field("value", REGEX_UID),
      optional(seq(",", field("title", /\w+[\s\w+]*/))),
      "]",
      "\n",
    ),

  inline_link: ($) => seq("[LINK: ", field("value", REGEX_UID), "]"),

  text_part: ($) => repeat1(choice($.anchor, $.normal_string)),
  normal_string: ($) =>
    seq(repeat(choice($.inline_link, token(/[^\n]/))), "\n"),

  single_line_text_part: ($) => choice($.anchor, $.single_line_normal_string),

  single_line_normal_string: ($) =>
    seq(repeat(choice($.inline_link, token(/[^\n]/))), "\n"),

  uid_string: ($) => REGEX_UID,
  field_name: ($) => /[A-Z][_A-Z0-9]*/,
  boolean_choice: () => choice("True", "False"),
  new_line: ($) => "\n",
  _eof: ($) => "\0",
};
