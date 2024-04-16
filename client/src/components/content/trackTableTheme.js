import { useTheme } from "@table-library/react-table-library/theme";
const resize = { resizerHighlight: "#1db954", resizerWidth: 4 };
function theme(type) {
  const rowLayout = {
    playlist: `--data-table-library_grid-template-columns: 3% 3% 69% 10% 5% 5% 5%`,
    artist: `--data-table-library_grid-template-columns: 3% 82% 5% 5% 5%`,
  };

  const theme = useTheme({
    Table: `flex: 1;
`,
    BaseRow: `
    .td {
      background-color: #141414;
      border-bottom: solid 1px #777777;
      padding: 5px 0;
    }
`,
    HeaderRow: `
    .th {
      background-color: #242424;s
      border-bottom: solid 2px #585858;
      padding: 5px 0;
      font-size: 1.5rem;
     p-2}
`,
    HeaderCell: `
        &:not(:last-of-type) {
          border-right: 1px solid #a0a8ae;
        }

        text-align: center;

        &:first-of-type {
          text-align: left;
        }

        &:last-of-type {
          text-align: right;
        }
      `,
    Table: rowLayout[type],
  });
  return theme;
}
export { resize, theme };
