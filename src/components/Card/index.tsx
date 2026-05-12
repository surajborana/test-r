import { useEffect, useState } from 'react';
import {
  CardActionArea,
  CardContent,
  Card as CardM,
  CardMedia,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  Rating,
  Stack,
  Typography,
} from '@mui/material';

const recipe = {
  id: 1,
  name: 'Classic Margherita Pizza',
  ingredients: [
    'Pizza dough',
    'Tomato sauce',
    'Fresh mozzarella cheese',
    'Fresh basil leaves',
    'Olive oil',
    'Salt and pepper to taste',
  ],
  instructions: [
    'Preheat the oven to 475°F (245°C).',
    'Roll out the pizza dough and spread tomato sauce evenly.',
    'Top with slices of fresh mozzarella and fresh basil leaves.',
    'Drizzle with olive oil and season with salt and pepper.',
    'Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.',
    'Slice and serve hot.',
  ],
  prepTimeMinutes: 20,
  cookTimeMinutes: 15,
  servings: 4,
  difficulty: 'Easy',
  cuisine: 'Italian',
  caloriesPerServing: 300,
  tags: ['Pizza', 'Italian'],
  userId: 166,
  image: 'https://cdn.dummyjson.com/recipe-images/1.webp',
  rating: 4.6,
  reviewCount: 98,
  mealType: ['Dinner'],
};
type Recipe = typeof recipe;

const Card = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipeDetails, setRecipeDetails] = useState<Recipe | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = (id: number) => {
    let data = recipes.filter((r) => r.id === id);
    setRecipeDetails(data[0]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getData = async (): Promise<void> => {
    try {
      const respons = await fetch('https://dummyjson.com/recipes');

      const data = await respons.json();

      console.log(data);

      // dummyjson returns { recipes: [...] }
      setRecipes(data.recipes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Grid container columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
      {recipes.map((r, index) => (
        <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }} sx={{ padding: 1 }}>
          <CardM
            onClick={() => handleClickOpen(r.id)}
            variant="outlined"
            sx={{ marginTop: '15px' }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                sx={{
                  height: {
                    xs: '140px', // mobile
                    sm: '140px', // tablet
                    md: '200px', // laptop
                    lg: '200px', // desktop
                  },
                }}
                image={r.image}
                alt="Paella dish"
              />
              <CardContent
                sx={{
                  padding: {
                    xs: 1, // mobile
                    sm: 1, // tablet
                    md: 2, // laptop
                    lg: 2, // desktop
                  },
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontSize: {
                      xs: '15px', // mobile
                      sm: '16px', // tablet
                      md: '18px', // laptop
                      lg: '18px', // desktop
                    },
                    paddingBottom: {
                      xs: '0px', // mobile
                      sm: '0px', // tablet
                      md: '0px', // laptop
                      lg: '0px', // desktop
                    },
                    color: '#000',
                    fontWeight: 600,
                  }}
                >
                  {r.name}
                </Typography>
                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{
                    alignItems: 'center',
                    paddingBottom: 1,
                  }}
                >
                  <Rating
                    name="hal-rating-read"
                    value={r.rating}
                    precision={0.5}
                    max={5}
                    size="small"
                    readOnly
                  />
                  <Typography
                    sx={{ fontSize: '12px' }}
                  >{`(${r.rating})`}</Typography>
                </Stack>
                {/*<Typography
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
                  {'Ingredients - '}
                  {r.ingredients}
                </Typography>*/}
              </CardContent>
            </CardActionArea>
            {/*<CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>*/}
          </CardM>
        </Grid>
      ))}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            padding: {
              xs: '8px', // mobile
              sm: '8px', // tablet
              md: '16px', // laptop
              lg: '16px', // desktop
            },
          }}
        >
          {recipeDetails && recipeDetails.name}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontWeight: 600, marginBottom: '8px' }}>
            {'Ingredients'}
          </Typography>
          <DialogContentText
            id="alezrt-dialog-description"
            sx={{ fontWeight: 400, fontSize: '15px', marginBottom: '8px' }}
          >
            {recipeDetails && recipeDetails.ingredients}
          </DialogContentText>
          <Typography sx={{ fontWeight: 600, marginBottom: '8px' }}>
            {'Instructions'}
          </Typography>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontWeight: 400, fontSize: '15px', marginBottom: '8px' }}
          >
            <List sx={{ padding: 0 }}>
              {recipeDetails &&
                recipeDetails.instructions.map((i, n) => (
                  <ListItem
                    disableGutters
                    divider
                    sx={{ display: 'list-item' }}
                  >
                    {i}
                  </ListItem>
                ))}
            </List>
          </DialogContentText>
        </DialogContent>
        {/*<DialogActions>
          <Button onClick={handleClose} autoFocus>
            Disagree
          </Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>*/}
      </Dialog>
    </Grid>
  );
};

export default Card;
