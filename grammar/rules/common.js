const REGEX_UID_PATTERN = /[\w]+[\w()\-\/\.:_]*/;

module.exports = {
  single_line_string: ($) => /[^\s]{1,}.*/,
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
};
