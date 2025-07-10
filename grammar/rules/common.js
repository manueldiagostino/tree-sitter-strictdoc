const REGEX_UID = /([\w]+[\w()\-\/.: ]*)/;

module.exports = {
  DOCUMENT: ($) => "DOCUMENT",
  GRAMMAR: ($) => "GRAMMAR",
  SECTION: ($) => "SECTION",
  DOCUMENT_FROM_FILE: ($) => "DOCUMENT_FROM_FILE",

  single_line_string: ($) => /[^\s][^\n\r]*/,
  multi_line_string: ($) =>
    seq(
      $.multiline_opening_token,
      "\n",
      $.text_part,
      $.multiline_closing_token,
      "\n",
    ),

  multiline_opening_token: ($) => token(">>>"),
  multiline_closing_token: ($) => token("<<<"),

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

  file_path: ($) => $.single_line_string,

  uid_string: ($) => REGEX_UID,
  field_name: ($) => token(/[A-Z][_A-Z0-9]*/),
  boolean_choice: () => choice("True", "False"),
  _newline: ($) => "\n",
  _eof: ($) => "\0",
};
