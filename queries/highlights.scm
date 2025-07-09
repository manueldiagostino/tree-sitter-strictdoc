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
] @keyword
(sdoc_composite_node) @keyword

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
] @constant.builtin

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
(requirement_type) @type
(file_entry_format) @type

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
] @type


;; Strings
(single_line_string) @string
(multi_line_string) @string
(uid_string) @string
(single_line_text_part) @string

;; Field names
(field_name) @property

;; Anchors and links
(anchor) @annotation
(inline_link) @link

;; Numeric literals
; (number) @number

