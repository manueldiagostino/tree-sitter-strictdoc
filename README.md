# StrictDoc Tree‑Sitter Parser for Neovim

This repository provides a Tree‑Sitter grammar for [StrictDoc](https://strictdoc.readthedocs.io/) and instructions to integrate it into Neovim using [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter).

## Prerequisites

- Neovim v0.8+ with [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter) installed
- A C compiler (`gcc` or `clang`) to build the parser
- Git

## Installation

### Using LazyVim

1. Place the following file in `~/.config/nvim/lua/plugins/nvim-treesitter.lua`:

   ```lua
   return {
     "nvim-treesitter/nvim-treesitter",
     build = ":TSUpdate",
     opts = {
       ensure_installed = { "latex", "strictdoc" },
       highlight = { enable = true },
     },
     config = function(_, opts)
       -- Filetype detection
       vim.filetype.add {
         extension = { sdoc = "sdoc" },
       }

       -- Register parser
       local parser_configs = require("nvim-treesitter.parsers").get_parser_configs()
       parser_configs.strictdoc = {
         install_info = {
           url = "https://github.com/manueldiagostino/tree-sitter-strictdoc",
           files = { "src/parser.c" },
           branch = "main",
         },
         filetype = "sdoc",
       }

       -- Link filetype to parser
       require("vim.treesitter.language").register("strictdoc", "sdoc")

       require("nvim-treesitter.configs").setup(opts)
     end,
   }
   ```

2. Restart Neovim and run:

   ```vim
   :TSInstall strictdoc
   ```

### Using packer.nvim or lazy.nvim

In your plugin specification:

```lua
use {
  "nvim-treesitter/nvim-treesitter",
  run = ":TSUpdate",
  config = function()
    -- (same registration snippet as above)
  end,
}
```

Then `:TSInstall strictdoc`.

## Usage

Open any `.sdoc` file in Neovim. The filetype should be detected as `sdoc`, the parser will load automatically, and Tree‑Sitter will provide syntax highlighting, incremental selection, and more.

If highlighting isn't applied, verify:

```vim
:echo &filetype    " should return sdoc
:TSBufEnable highlight
:TSPlaygroundToggle
```

## References

- StrictDoc [official website](https://strictdoc.org)
- StrictDoc [grammar](https://github.com/manueldiagostino/tree-sitter-strictdoc)
- [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter)
- [Adding custom parsers](https://github.com/nvim-treesitter/nvim-treesitter/wiki/Adding-parsers) to nvim-treesitter

## Contributing

Contributions are welcome! Please open issues or pull requests against this repository. Make sure to run `:TSUpdate strictdoc` and test your changes locally before submitting.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
