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
const document_grammar_rules = require("./rules/document_grammar");
const document_metadata_rules = require("./rules/document_metadata");
const section_or_requirement_rules = require("./rules/section_or_requirement");

module.exports = grammar({
  name: "strictdoc",
  extras: (_) => ["\r"],
  precedences: ($) => [[$.sdoc_section, $.sdoc_node]],

  rules: {
    source_file: ($) =>
      seq(
        "[DOCUMENT]",
        "\n",
        optional(seq("MID", ":", " ", field("mid", $.single_line_string), "\n")),
        "TITLE",
        ":", " ",
        field("title", $.single_line_string),
        "\n",
        optional(field("config", $.document_config)),
        optional(field("view", $.document_view)),
        optional(field("grammar", $.document_grammar)),
        optional(
          field("section_and_requirement_list", $.section_or_requirement_list),
        ),
        optional($._eof),
      ),

    ...document_config_rules,
    ...document_view_rules,
    ...document_grammar_rules,
    ...document_metadata_rules,
    ...type_system_rules,
    ...common_rules,
    ...section_or_requirement_rules,
  },
});
