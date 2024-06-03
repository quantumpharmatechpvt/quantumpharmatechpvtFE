import { Box, Typography } from '@mui/material';
import { CostCentersTable } from './UsersTable';

const Page = () => {
  return (
    <Box>
      <Typography  variant="h5">Users</Typography >
      <CostCentersTable />
    </Box>
  );
};

export default Page;
