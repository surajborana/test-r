import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Dialog,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Slide,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

import { TransitionProps } from '@mui/material/transitions';
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {};
  phone: string;
  website: string;
  company: {};
};

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      width: 80,
      height: 80,
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Story = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>({
    id: 0,
    name: 'Suraj Borana',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: {
        lat: '-43.9509',
        lng: '-34.4618',
      },
    },
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
  });
  const [open, setOpen] = useState(false);
  function handleClickOpen(id: number | string) {
    let usr = users.filter((u) => u.id === id);
    setOpen(true);
    setUser(usr[0]);
    console.log(user);
  }

  const handleClose = () => {
    setOpen(false);
  };
  const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((respons) => {
        return respons.json();
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <Tabs
        variant="scrollable"
        scrollButtons
        aria-label="scrollable force tabs example"
      >
        {users.map((e, i) => (
          <div
            onClick={() => {
              handleClickOpen(e.id);
            }}
          >
            <Tab
              key={e.id}
              value={e.name}
              icon={<Avatar {...stringAvatar(e.name)} />}
            />
          </div>
        ))}
      </Tabs>
      <Dialog
        fullScreen
        sx={{ height: '150px', top: 'initial' }}
        open={open}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar sx={{ marginRight: '12px' }}>
              <Avatar {...stringAvatar(user.name)} />
            </ListItemAvatar>
            <ListItemText
              primary={user?.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: 'text.primary', display: 'block' }}
                  >
                    {user.email}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: 'text.primary', display: 'block' }}
                  >
                    {'Contact - '}
                    {user.phone}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: 'text.primary', display: 'block' }}
                  >
                    {'Website - '}
                    {user.website}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </Dialog>
    </Box>
  );
};

export default Story;
