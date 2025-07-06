module.exports = {
  document_custom_metadata: ($) =>
    repeat1($.document_custom_metadata_key_value_pair),

  document_custom_metadata_key_value_pair: ($) =>
    seq(
      /[ ]{2}/,
      field("key", $.document_custom_metadata_key),
      ": ",
      field("value", $.single_line_string),
      "\n",
    ),

  document_custom_metadata_key: () => /[a-zA-Z_][a-zA-Z0-9_-]*/,
};
