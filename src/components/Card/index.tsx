import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Card as CardM,
  Typography,
} from '@mui/material';

type CardType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const Card = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((respons) => {
        return respons.json();
      })
      .then((data) => {
        console.log(data);
        setCards(data);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Box sx={{ maxWidth: 360, margin: 'auto' }}>
      {cards.map((c, i) => {
        return (
          <CardM variant="outlined" sx={{ marginTop: '15px' }}>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontSize: {
                    xs: '16px', // mobile
                    sm: '16px', // tablet
                    md: '22px', // laptop
                    lg: '22px', // desktop
                  },
                  paddingBottom: {
                    xs: '10px', // mobile
                    sm: '10px', // tablet
                    md: '24px', // laptop
                    lg: '24px', // desktop
                  },
                  color: '#000',
                  fontWeight: 600,
                }}
              >
                {c.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: {
                    xs: '14px', // mobile
                    sm: '14px', // tablet
                    md: '14px', // laptop
                    lg: '14px', // desktop
                  },

                  fontWeight: 400,
                }}
              >
                {c.body}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </CardM>
        );
      })}
    </Box>
  );
};

export default Card;
