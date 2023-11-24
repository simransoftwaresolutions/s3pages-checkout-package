import { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { BiUser } from 'react-icons/bi';
import { IoLayersOutline } from 'react-icons/io5';
import { LuAlarmClock } from 'react-icons/lu';
import { PiPencilLineLight } from 'react-icons/pi';

const defaultCardData = [
  {
    id: '1',
    icon: <BiUser />,
    heading: 'Happy Clients',
    unit: '2,140',
  },
  {
    id: '2',
    icon: <IoLayersOutline />,
    heading: 'Projects Completed',
    unit: '2,580',
  },
  {
    id: '3',
    icon: <LuAlarmClock />,
    heading: 'Hours Worked',
    unit: '4,500',
  },
  {
    id: '4',
    icon: <PiPencilLineLight />,
    heading: 'Articles Published',
    unit: '100',
  },
];

export default function Index({ cardData }: any) {
  const [animatedData, setAnimatedData] = useState(
    defaultCardData.map((item) => ({ ...item, animatedValue: 0 }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedData = animatedData.map((item) => {
        const currentValue = item.animatedValue;
        const targetValue = parseInt(item.unit.replace(/[^\d]+/g, ''), 10);
        const increment = Math.ceil(targetValue / 50); 

        const newValue = currentValue + increment >= targetValue ? targetValue : currentValue + increment;

        return { ...item, animatedValue: newValue };
      });

      setAnimatedData(updatedData);

      const allValuesReached = updatedData.every(
        (item) => item.animatedValue === parseInt(item.unit.replace(/[^\d]+/g, ''), 10)
      );

      if (allValuesReached) {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [animatedData]);

  const cardData1 = cardData || animatedData;

  return (
    <div>
      <Box sx={{ padding: '100px 0px' }}>
        <Container>
          <Box
            sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: '600' }}>
              Our achievements
            </Typography>
            <Box pt={1} maxWidth="700px">
              <Typography variant="body1" sx={{ fontWeight: '500' }}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr diam nonumy eirmod tempor invidunt ut labore et
                dolore magna aliquyam erat, sed diam voluptua.
              </Typography>
            </Box>
          </Box>
          <Box sx={{ paddingTop: '70px' }}>
            <Grid container spacing={3}>
              {cardData1.map((item: any) => (
                <Grid item xs={12} sm={6} md={3} key={item.id}>
                  <Box
                    pt={2}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Box className="circleBox">{item.icon}</Box>
                    <Box pt={2}>
                      <Typography variant="h2" sx={{ fontWeight: '500' }}>
                        {item.animatedValue.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box sx={{ paddingTop: { md: '16px', xs: '0px' } }}>
                      <Typography variant="body2" sx={{ fontWeight: '500' }}>
                        {item?.heading}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
