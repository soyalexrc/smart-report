import React from 'react';
import {AdminLayout} from "../components/layouts";
import {
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  Chip,
  Divider,
  LinearProgress,
  TableContainer,
  DialogTitle,
  DialogActions,
  Button, useMediaQuery

} from '@mui/material'
import {styled} from '@mui/material/styles'
import {parseCookie, sleep} from "../utils";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import {useSnackbar} from "notistack";
import TableViewIcon from '@mui/icons-material/TableView';
import {GetServerSideProps} from "next";

const TableHeaderItem = styled(TableCell)(({theme}: { theme: any }) => ({
  color: theme.palette.common.black,
  fontWeight: 'bold',
}));

export default function Reports() {
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))

  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = React.useState(false)
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const {enqueueSnackbar} = useSnackbar()

  async function search() {
    setLoading(true)
    await sleep(3000)
    setData(true)
    setLoading(false)
  }

  function handleCloseConfirmationModal() {
    setShowConfirmationModal(false)
  }

  function acceptValidationTicket() {
    setShowConfirmationModal(false)
    enqueueSnackbar('Se valido el ticket de atencion 123123123, con exito!', {variant: 'success'})
    search()
  }

  function clearSearch() {}

  return (
    <AdminLayout title='Gestion de reportes | Smart Report'>
      <>
        <Paper elevation={5} sx={{p: 2}}>
          <Typography align='center' variant='h4' sx={{mb: 2}}>Gestion de reportes</Typography>
          <Box display='flex' alignItems='center' justifyContent={largeScreen ? "space-between" : "center"} flexWrap='wrap'>
            <Box display='flex' alignItems='center' gap={2}>
              <Box>
                <Typography align='center'>Desde</Typography>
                <TextField
                  color='secondary'
                  size='small'
                  type='date'
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  variant="outlined"
                />
              </Box>
              <Box>
                <Typography variant='h1'>-</Typography>
              </Box>
              <Box>
                <Typography align='center'>Hasta</Typography>
                <TextField
                  color='secondary'
                  size='small'
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  type='date'
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box display='flex' alignItems='center' gap={2} mt={largeScreen ? 0 : 2}>
              <Button variant='outlined' color='secondary' startIcon={<PictureAsPdfIcon/>}>Exportar PDF</Button>
              <Button variant='outlined' color='secondary' startIcon={<TableViewIcon/>}>Export Excel</Button>
            </Box>
          </Box>
          <Box mt={2} display='flex' alignItems='center' gap={3}>
            <TextField
              color='secondary'
              size='small'
              label='Especialidad'
              placeholder='Especialidad'
              variant="outlined"
            />
            <TextField
              color='secondary'
              size='small'
              label='Medico'
              placeholder='Medico'
              variant="outlined"
            />
            <TextField
              color='secondary'
              size='small'
              label='Especialidad'
              placeholder='Especialidad'
              variant="outlined"
            />
          </Box>
          <Button fullWidth sx={{mt: 2}} color='secondary' variant='contained' onClick={search}>Buscar</Button>
          <Box display='flex' justifyContent='flex-end'>
            <Chip
              sx={{m: 1}}
              label={<Typography variant="caption">Usted esta buscando en el rango: <b>{startDate}</b> - <b>{endDate}</b></Typography>}
              size='small'
              variant='outlined'
              onDelete={clearSearch}/>
          </Box>

        </Paper>

        <Divider sx={{my: 3}}/>

        {
          !loading && data &&
          <Paper elevation={5} sx={{p: 2, mt: 3}}>
            <TableContainer>
              <Table width='100%'>
                <TableHead sx={{backgroundColor: '#eaeaea'}}>
                  <TableRow>
                    <TableHeaderItem>Estado</TableHeaderItem>
                    <TableHeaderItem>Tipo de Documento</TableHeaderItem>
                    <TableHeaderItem>Serie</TableHeaderItem>
                    <TableHeaderItem>Nº</TableHeaderItem>
                    <TableHeaderItem>Fecha de emision</TableHeaderItem>
                    <TableHeaderItem>Paciente</TableHeaderItem>
                    <TableHeaderItem>Fecha de atencion</TableHeaderItem>
                    <TableHeaderItem>Forma de pago</TableHeaderItem>
                    <TableHeaderItem>Especialidad</TableHeaderItem>
                    <TableHeaderItem>Medico</TableHeaderItem>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Chip sx={{backgroundColor: 'success.light', color: '#fff'}}
                            label="ATENDIDO"/>
                    </TableCell>
                    <TableCell>
                      <Box width={150} sx={{textAlign: 'center'}}>
                        DNI
                      </Box>
                    </TableCell>
                    <TableCell>200289292</TableCell>
                    <TableCell>3738288</TableCell>
                    <TableCell>
                      <Box width={150} sx={{textAlign: 'center'}}>
                        15/02/0222
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box width={100}>
                        Pedro Perez
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box width={150} sx={{textAlign: 'center'}}>
                        15/02/0222
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box width={150} sx={{textAlign: 'center'}}>
                        EFECTIVO
                      </Box>
                    </TableCell>
                    <TableCell>Traumatologia</TableCell>
                    <TableCell>
                      <Box width={150}>
                        Renzo Rodriguez
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{backgroundColor: '#F4F4F4FF'}}>
                    <TableCell>
                      <Chip  sx={{backgroundColor: 'success.light', color: '#fff'}}
                            label="ATENDIDO"/>
                    </TableCell>
                    <TableCell>
                      <Box width={150} sx={{textAlign: 'center'}}>
                        DNI
                      </Box>
                    </TableCell>
                    <TableCell>200289292</TableCell>
                    <TableCell>3738288</TableCell>
                    <TableCell>
                      <Box width={150} sx={{textAlign: 'center'}}>
                        15/02/0222
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box width={100}>
                        Pedro Perez
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box width={150} sx={{textAlign: 'center'}}>
                        15/02/0222
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box width={150} sx={{textAlign: 'center'}}>
                        EFECTIVO
                      </Box>
                    </TableCell>
                    <TableCell>Traumatologia</TableCell>
                    <TableCell>
                      <Box width={150}>
                        Renzo Rodriguez
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        }

        {
          loading &&
          <Box sx={{width: '100%'}}>
            <LinearProgress/>
          </Box>
        }

        <Dialog
          open={showConfirmationModal}
          onClose={handleCloseConfirmationModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Esta seguro de validar el ticket de atencion 12312312 ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmationModal}>Cancelar</Button>
            <Button onClick={acceptValidationTicket} autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>

      </>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  if (!parseCookie('isAuthenticated', req.headers.cookie!)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
