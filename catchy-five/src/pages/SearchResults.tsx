import { useSearchParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Search Results
      </Typography>
      <Typography variant="body1">
        Showing results for: <strong>{query}</strong>
      </Typography>

      {/* add product listing or suggestions here */}
    </Box>
  );
}
