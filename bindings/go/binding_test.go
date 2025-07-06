package tree_sitter_strictdoc_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_strictdoc "github.com/tree-sitter/tree-sitter-strictdoc/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_strictdoc.Language())
	if language == nil {
		t.Errorf("Error loading Strictdoc grammar")
	}
}
