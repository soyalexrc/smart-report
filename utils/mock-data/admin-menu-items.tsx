import React from 'react';
import WidgetsIcon from "@mui/icons-material/Widgets";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SummarizeIcon from '@mui/icons-material/Summarize';

interface AdminMenu {
  title: string;
  path?: string;
  value: string;
  icon: JSX.Element;
  id: number;
  roles: string[],
  children?: AdminMenuSubPath[]
}

interface AdminMenuSubPath {
  title: string;
  path: string;
  value: string;
  id: number;
}

export const ADMIN_MENU_ITEMS: AdminMenu[] = [
  {
    title: "Inicio",
    path: "/",
    value: "inicio",
    icon: <WidgetsIcon style={{ color: "white" }} />,
    id: 2,
    roles: [
      "Administrador",
      "Asesor inmobiliario Vision",
      "Coordinador de servicios",
      "User"
    ],
  },
  {
    title: "Validacion de tickets | Pacientes atendidos",
    path: "/validacion-de-tickets",
    icon: <AssignmentIndIcon style={{ color: "white" }} />,
    value: "propietarios",
    id: 5,
    roles: ["Administrador", "User"],
  },
  {
    title: "Reportes",
    path: "/reportes",
    icon: <SummarizeIcon style={{ color: "white" }} />,
    value: "usuarios",
    id: 4,
    roles: ["Administrador", "User"],
  },
];
