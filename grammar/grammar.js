/**
 * @file A tree-sitter parser for the strictdoc language
 * @author Manuel Di Agostino <diagostinomanuel@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const common_rules = require("./rules/common");
const type_system_rules = require("./rules/type_system");
const document_config_rules = require("./rules/document_config");
const document_view_rules = require("./rules/document_view");
const document_metadata_rules = require("./rules/document_metadata");
const section_or_requirement_rules = require("./rules/section_or_requirement");

module.exports = grammar({
  name: "strictdoc",

  rules: {
    source_file: ($) =>
      seq(
        "[DOCUMENT]",
        "\n",
        optional(seq("MID: ", field("mid", $.single_line_string), "\n")),
        "TITLE: ",
        field("title", $.single_line_string),
        "\n",
        optional(field("config", $.document_config)),
        optional(field("view", $.document_view)),
        // optional(seq("\n", field("grammar", $.document_grammar))),
        // field("section_contents", repeat($.section_or_requirement)),
      ),

    ...common_rules,
    ...type_system_rules,
    ...document_config_rules,
    ...document_metadata_rules,
    ...document_view_rules,
    // ...section_or_requirement_rules,

    // Text parts
    boolean_choice: () => choice("True", "False"),
    markup_choice: () => choice("RST", "Text", "HTML"),
    auto_levels_choice: () => choice("On", "Off"),
    layout_choice: () => choice("Default", "Website"),
    requirement_style_choice: () =>
      choice("Plain", "Inline", "Simple", "Narrative", "Table", "Zebra"),
  },
});
