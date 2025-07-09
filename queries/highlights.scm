;; Tree-sitter highlight queries for strictdoc

;; —————————————————————————————————————————
;; Keywords “blok” del documento
;; —————————————————————————————————————————
[
  "[DOCUMENT]"
  "[GRAMMAR]"
  "[SECTION]"
  "[/SECTION]"
  "[DOCUMENT_FROM_FILE]"
  (sdoc_node_opening)
  (sdoc_composite_node_opening)
  (sdoc_composite_node_closing)
  (sdoc_composite_node_type_name)
] @keyword

[
  "TITLE"
  "UID"
  "MID"
  "TAG"
  "VERSION"
  "DATE"
  "PROPERTIES"
  "METADATA"
  "CLASSIFICATION"
  "PREFIX"
  "REQ_PREFIX"
  "ROOT"
  "OPTIONS"
  "ENABLE_MID"
  "MARKUP"
  "AUTO_LEVELS"
  "LAYOUT"
  "VIEW_STYLE"
  "REQUIREMENT_STYLE"
  "NODE_IN_TOC"
  "REQUIREMENT_IN_TOC"
  "DEFAULT_VIEW"
  "TYPE"
  "REQUIRED"
  "FILE"
  "VALUE"
  "ROLE"
  "FORMAT"
  "FIELDS"
] @type.builtin

;; Operators
[
  (multiline_opening_token)
  (multiline_closing_token)
] @operator

;; Punctuation
[
  ":" @punctuation.delimiter
  "," @punctuation.delimiter
  "-" @punctuation.delimiter
]

;; Boolean literals
(boolean_choice) @boolean

;; Requirement types and file formats

;; Config option values
[
  "Default"
  "Website"
  "RST"
  "Text"
  "HTML"
  "On"
  "Off"
  "Plain"
  "Inline"
  "Simple"
  "Narrative"
  "Table"
  "Zebra"
  "Parent"
  "Child"
  "File"
] @constant.builtin


;; Strings
(single_line_string) @string
(multi_line_string) @string
(single_line_text_part) @string
[ (uid_string) (req_reference_value_id) ] @string.special.symbol

;; Fields
(document_custom_metadata_key) @property
[ "RELATIONS" (field_name) ] @variable.member

;; Anchors and links
(anchor) @annotation
(inline_link) @link

[
 (role_id)
] @variable
