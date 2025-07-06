module.exports = {
  document_config: ($) =>
    seq(
      seq("UID: ", field("uid", $.uid_string), "\n"),
      optional(seq("VERSION: ", field("version", $.single_line_string), "\n")),
      optional(seq("DATE: ", field("date", $.single_line_string), "\n")),
      optional(
        seq(
          "CLASSIFICATION: ",
          field("classification", $.single_line_string),
          "\n",
        ),
      ),
      optional(
        seq(
          choice("PREFIX: ", "REQ_PREFIX: "),
          field("requirement_prefix", $.single_line_string),
          "\n",
        ),
      ),
      optional(seq("ROOT: ", field("root", /true|false/), "\n")),
      optional(
        seq(
          "OPTIONS:",
          "\n",
          seq(
            /[ ]{2}/,
            "ENABLE_MID: ",
            field("enable_mid", $.boolean_choice),
            "\n",
            optional(
              seq(/[ ]{2}/, "MARKUP: ", field("markup", $.markup_choice), "\n"),
            ),
            optional(
              seq(
                /[ ]{2}/,
                "AUTO_LEVELS: ",
                field("auto_levels", $.auto_levels_choice),
                "\n",
              ),
            ),
            optional(
              seq(/[ ]{2}/, "LAYOUT: ", field("layout", $.layout_choice), "\n"),
            ),
            optional(
              seq(
                /[ ]{2}/,
                field("view_style_tag", /(?:VIEW_STYLE|REQUIREMENT_STYLE)/),
                ": ",
                field("requirement_style", $.requirement_style_choice),
                "\n",
              ),
            ),
            optional(
              seq(
                /[ ]{2}/,
                field("node_in_toc_tag", /(?:NODE_IN_TOC|REQUIREMENT_IN_TOC)/),
                ": ",
                field("requirement_in_toc", $.boolean_choice),
                "\n",
              ),
            ),
          ),
        ),
      ),
      optional(
        seq(
          "METADATA:",
          "\n",
          field("custom_metadata", $.document_custom_metadata),
        ),
      ),
    ),
};
