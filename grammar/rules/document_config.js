module.exports = {
  document_config: ($) =>
    seq(
      "UID",
      ":",
      " ",
      field("uid", $.uid_string),
      "\n",
      optional($.document_version),
      optional($.document_date),
      optional($.document_classification),
      optional($.document_requirement),
      optional(seq("ROOT", ":", " ", field("root", $.boolean_choice), "\n")),
      optional(field("options", $.document_config_options)),
      optional(field("metadata", $.document_custom_metadata)),
    ),

  document_version: ($) =>
    seq("VERSION", ":", " ", field("version", $.single_line_string), "\n"),

  document_date: ($) => seq("DATE", ":", " ", field("date", $.date), "\n"),

  date: ($) => $.single_line_string,

  document_classification: ($) =>
    seq(
      "CLASSIFICATION",
      ":",
      " ",
      field("classification", $.single_line_string),
      "\n",
    ),

  document_requirement: ($) =>
    seq(
      choice(seq("PREFIX", ":", " "), seq("REQ_PREFIX", ":", " ")),
      field("requirement_prefix", $.single_line_string),
      "\n",
    ),

  document_config_options: ($) =>
    seq(
      "OPTIONS",
      ":",
      "\n",
      optional($.enable_mid),
      optional($.markup),
      optional($.auto_levels),
      optional($.layout),
      optional($.view_style),
      optional($.in_toc_tag),
      optional($.default_view),
    ),

  enable_mid: ($) => seq("  ", "ENABLE_MID", ":", " ", $.boolean_choice, "\n"),
  markup: ($) => seq("  ", "MARKUP", ":", " ", $.markup_choice, "\n"),
  auto_levels: ($) =>
    seq("  ", "AUTO_LEVELS", ":", " ", $.auto_levels_choice, "\n"),
  layout: ($) => seq("  ", "LAYOUT", ":", " ", $.layout_choice, "\n"),
  view_style: ($) =>
    seq("  ", $._view_style_choice, ":", " ", $.style_choice, "\n"),
  in_toc_tag: ($) =>
    seq("  ", $._in_toc_choice, ":", " ", $.boolean_choice, "\n"),
  default_view: ($) =>
    seq("  ", "DEFAULT_VIEW", ":", " ", $.single_line_string, "\n"),

  layout_choice: ($) => choice("Default", "Website"),
  markup_choice: ($) => choice("RST", "Text", "HTML"),
  auto_levels_choice: ($) => choice("On", "Off"),
  style_choice: ($) =>
    choice("Plain", "Inline", "Simple", "Narrative", "Table", "Zebra"),
  _view_style_choice: ($) => choice("VIEW_STYLE", "REQUIREMENT_STYLE"),
  _in_toc_choice: ($) => choice("NODE_IN_TOC", "REQUIREMENT_IN_TOC"),
};
