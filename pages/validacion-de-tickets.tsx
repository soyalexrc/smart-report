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
  FormControl,
  TableBody,
  Dialog,
  DialogContent,
  DialogContentText,
  Select,
  MenuItem,
  TextField,
  Chip,
  Divider,
  LinearProgress,
  TableContainer,
  DialogTitle,
  DialogActions,
  Button

} from '@mui/material'
import {styled} from '@mui/material/styles'
import {parseCookie, sleep} from "../utils";
import {useSnackbar} from "notistack";
import {GetServerSideProps} from "next";

const TableHeaderItem = styled(TableCell)(({theme}: { theme: any }) => ({
  color: theme.palette.common.black,
  fontWeight: 'bold',
}));

export default function TicketsValidation() {
  const [searchBy, setSearchBy] = React.useState<any>('Nº de serie')
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const {enqueueSnackbar} = useSnackbar()

  async function search() {
    setLoading(true)
    await sleep(3000)
    setData(true)
    setLoading(false)
  }

  function handleOptions(event: any) {
    console.log(event)
    setShowConfirmationModal(true)
  }

  function handleCloseConfirmationModal() {
    setShowConfirmationModal(false)
  }

  function acceptValidationTicket() {
    setShowConfirmationModal(false)
    enqueueSnackbar('Se valido el ticket de atencion 123123123, con exito!', {variant: 'success'})
    search()
  }

  function clearSearch() {
    setSearchBy('')
    setSearchTerm('')
  }

  return (
    <AdminLayout title='Validacion de tickets - Pacientes atendidos | Smart Report'>
      <>
        <Paper elevation={5} sx={{p: 2}}>
          <Typography align='center' variant='h4' sx={{mb: 2}}>Validacion de tickets | Pacientes atendidos</Typography>
          <Box display='flex' alignItems='flex-start' gap={2}>
            <FormControl
              size='small'
              sx={{width: 200}}
            >
              <Select
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
              >
                <MenuItem value='Nº de serie'>Nº de serie</MenuItem>
                <MenuItem value='Nº de ticket'>Nº de ticket</MenuItem>
                <MenuItem value='Apellido Paterno'>Apellido Paterno</MenuItem>
                <MenuItem value='Apellido Materno'>Apellido Materno</MenuItem>
                <MenuItem value='Nombre'>Nombre</MenuItem>
                <MenuItem value='Codigo de seguridad'>Codigo de seguridad</MenuItem>
              </Select>
              <Typography variant='caption'>Buscar por</Typography>
            </FormControl>
            <TextField
              color='secondary'
              fullWidth
              size='small'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && search() }
              placeholder={`Ingresa ${searchBy}`}
              label={`Buscar por ${searchBy}`}
              variant="outlined"
            />
          </Box>
          <Button disabled={!searchBy} fullWidth sx={{mt: 2}} color='secondary' variant='contained' onClick={search}>Buscar</Button>
          {
            searchBy &&
            <Box display='flex' justifyContent='flex-end'>
              <Chip
                sx={{m: 1}}
                label={<Typography variant="caption">Usted esta buscando por: <b>{searchBy}</b></Typography>}
                size='small'
                variant='outlined'
                onDelete={clearSearch}/>
            </Box>
          }

        </Paper>

        <Divider sx={{ my: 3 }} />

        {
          !loading && data &&
          <Paper elevation={5} sx={{ p: 2, mt: 3 }}>
            <TableContainer>
              <Table width='100%'>
                <TableHead sx={{ backgroundColor: '#eaeaea' }}>
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
                  <TableRow >
                    <TableCell>
                      <Chip onClick={handleOptions} sx={{ backgroundColor: 'error.light', color: '#fff' }} label="PENDIENTE" />
                    </TableCell>
                    <TableCell>
                      <Box width={150} sx={{ textAlign: 'center'}}>
                        DNI
                      </Box>
                    </TableCell>
                    <TableCell>200289292</TableCell>
                    <TableCell>3738288</TableCell>
                    <TableCell>
                      <Box width={150} sx={{ textAlign: 'center' }}>
                        15/02/0222
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box width={100}>
                        Pedro Perez
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box width={150} sx={{ textAlign: 'center' }}>
                        15/02/0222
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box width={150} sx={{ textAlign: 'center' }}>
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
                  <TableRow sx={{ backgroundColor: '#F4F4F4FF'}}>
                    <TableCell>
                      <Chip disabled onClick={handleOptions} sx={{ backgroundColor: 'success.light', color: '#fff' }} label="ATENDIDO" />
                    </TableCell>
                    <TableCell>
                      <Box width={150} sx={{ textAlign: 'center'}}>
                        DNI
                      </Box>
                    </TableCell>
                    <TableCell>200289292</TableCell>
                    <TableCell>3738288</TableCell>
                    <TableCell>
                      <Box width={150} sx={{ textAlign: 'center' }}>
                        15/02/0222
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box width={100}>
                        Pedro Perez
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box width={150} sx={{ textAlign: 'center' }}>
                        15/02/0222
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box width={150} sx={{ textAlign: 'center' }}>
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

