; == StrictDoc Code Navigation Queries ==

; -- Document Configuration Definitions --
(
(document_config
uid: (uid_string) @name) @definition.document.uid
)
(
(document_version
version: (single_line_string) @name) @definition.document.version
)
(
(document_date
date: (date) @name) @definition.document.date
)
(
(document_classification
classification: (single_line_string) @name) @definition.classification
)
(
(document_requirement
requirement_prefix: (single_line_string) @name) @definition.requirement_prefix
)
(
(document_config
options: (document_config_options) @name) @definition.options
)
