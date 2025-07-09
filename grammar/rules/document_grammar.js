module.exports = {
  document_grammar: ($) =>
    seq(
      "\n",
      "[GRAMMAR]",
      "\n",
      choice($.grammar_elements, $.import_from_file),
    ),

  import_from_file: ($) =>
    seq("IMPORT_FROM_FILE", ":", " ", field("import_path", /.*/), "\n"),

  grammar_elements: ($) =>
    seq("ELEMENTS", ":", "\n", repeat1($.grammar_element)),

  grammar_element: ($) =>
    seq(
      "-",
      " ",
      "TAG",
      ":",
      " ",
      field("requirement_type", $.requirement_type),
      "\n",
      optional(field("properties", $.grammar_properties)),
      field("grammar_fields", $.grammar_fields),
      optional(field("grammar_relations", $.grammar_relations)),
    ),

  grammar_properties: ($) =>
    seq(
      "  ",
      "PROPERTIES",
      ":",
      "\n",
      optional($.grammar_property_is_composite),
      optional($.grammar_property_prefix),
      optional($.grammar_property_view_style),
    ),

  grammar_property_is_composite: ($) =>
    seq("    ", "IS_COMPOSITE", ":", " ", $.boolean_choice, "\n"),

  grammar_property_prefix: ($) =>
    seq("    ", "PREFIX", ":", " ", $.single_line_string, "\n"),

  grammar_property_view_style: ($) =>
    seq("    ", "VIEW_STYLE", ":", " ", $.style_choice, "\n"),

  grammar_fields: ($) =>
    seq("  ", "FIELDS", ":", "\n", repeat1($.grammar_field)),

  grammar_field: ($) =>
    seq(
      $.grammar_field_title,
      choice(
        $.grammar_field_string,
        $.grammar_field_single_choice,
        $.grammar_field_multiple_choice,
        $.grammar_field_tag,
      ),
      $.grammar_field_required,
    ),

  grammar_field_title: ($) =>
    prec.left(
      seq(
        "  ",
        "-",
        " ",
        "TITLE",
        ":",
        " ",
        field("title", $.field_name),
        "\n",
        optional(
          seq(
            "    ",
            "HUMAN_TITLE",
            ":",
            " ",
            field("human_title", $.single_line_string),
            "\n",
          ),
        ),
      ),
    ),

  grammar_field_required: ($) =>
    seq("    ", "REQUIRED", ":", " ", field("value", $.boolean_choice), "\n"),

  grammar_field_choices: ($) =>
    seq("(", $.choice_option, repeat(seq(", ", $.choice_option)), ")"),

  grammar_field_string: ($) => seq("    ", "TYPE", ":", " String\n"),

  grammar_field_single_choice: ($) =>
    seq(
      "    ",
      "TYPE",
      ":",
      " ",
      "SingleChoice",
      $.grammar_field_choices,
      "\n",
    ),

  grammar_field_multiple_choice: ($) =>
    seq(
      "    ",
      "TYPE",
      ":",
      " ",
      "MultipleChoice",
      $.grammar_field_choices,
      "\n",
    ),

  grammar_field_tag: ($) => seq("    ", "TYPE", ":", " ", "Tag", "\n"),

  grammar_relations: ($) =>
    seq("  RELATIONS:", "\n", repeat1($.grammar_relation)),

  grammar_relation: ($) =>
    choice(
      $.grammar_relation_parent,
      $.grammar_relation_child,
      $.grammar_relation_file,
    ),

  grammar_relation_parent: ($) =>
    seq(
      "  ",
      "-",
      " ",
      "TYPE",
      ":",
      " ",
      "Parent",
      "\n",
      optional(
        seq(
          "    ",
          "ROLE",
          ":",
          " ",
          field("relation_role", $.single_line_string),
          "\n",
        ),
      ),
    ),

  grammar_relation_child: ($) =>
    seq(
      "  ",
      "-",
      " ",
      "TYPE",
      ":",
      " ",
      "Child",
      "\n",
      optional(
        seq(
          "    ",
          "ROLE",
          ":",
          " ",
          field("relation_role", $.single_line_string),
          "\n",
        ),
      ),
    ),

  grammar_relation_file: ($) =>
    seq(
      "  ",
      "-",
      " ",
      "TYPE",
      ":",
      " ",
      "File",
      "\n",
      optional(
        seq(
          "    ",
          "ROLE",
          ":",
          " ",
          field("relation_role", $.single_line_string),
          "\n",
        ),
      ),
    ),
};
