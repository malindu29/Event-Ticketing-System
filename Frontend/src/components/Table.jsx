import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';

const Table = ({
  rows,
  columns,
  pageSizeOptions = [5, 10],
  checkboxSelection = false,
  height = '100%',
  width = '100%',
}) => {
  return (
    <Paper sx={{ height, width }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={pageSizeOptions}
        checkboxSelection={checkboxSelection}
        sx={{ border: 0, }}
      />
    </Paper>
  );
};

// Prop types for validation
Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  checkboxSelection: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default Table;
