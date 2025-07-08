module.exports = {
  document_custom_metadata: ($) =>
    seq("METADATA:\n", $.document_custom_metadata_entries),

  document_custom_metadata_entries: ($) =>
    repeat1($.document_custom_metadata_entry),

  document_custom_metadata_entry: ($) =>
    seq("  ", $.document_custom_metadata_key_value_pair, "\n"),

  document_custom_metadata_key_value_pair: ($) =>
    seq(
      field("key", $.document_custom_metadata_key),
      ": ",
      field("value", $.single_line_string),
    ),

  document_custom_metadata_key: ($) => /[a-zA-Z_][a-zA-Z0-9_-]*/,
};
