import { useContext, useEffect, useState } from "react";
import api from "../../services/api";
import {
  Container,
  SaleButtons,
  SaleContent,
  Agent,
  Footer,
  Observation,
  ObservationBtn,
  ModalOverlay,
  ModalBox,
  ModalButtons,
  ObservationModalButtons,
  ObservationTextArea,
  ObservationModalBox,
  CpfCnpj,
} from "./styles";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { toDate } from "date-fns-tz";
import { TfiHome } from "react-icons/tfi";
import { PiBuildingOfficeLight } from "react-icons/pi";

export function SaleItem({ sale }: any) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [observation, setObservation] = useState(sale?.observation);

  async function handleEditSale(id: string) {
    if (user.employeeId === sale.user.employeeId) {
      navigate(`edit-sale/${id}`);
    }
  }

  const saleDate = sale.saleDate;
  const installationDate = sale.installationDate;

  const formattedSaleDate = saleDate
    ? new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "America/Sao_Paulo",
      }).format(new Date(saleDate))
    : "-";

  const formattedInstallationDate = installationDate
    ? new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "America/Sao_Paulo",
      }).format(new Date(installationDate))
    : "-";

  const transformStatus = (status: string) => {
    return status.replace(/_/g, " ");
  };

  const timeZone = "America/Sao_Paulo";

  async function handleChangeObservation(id: string) {
    await api.put(`/sales/${id}`, {
      userId: user.id,
      cpfCnpj: sale.cpfCnpj,
      region: sale.region,
      ticket: sale.ticket,
      callerIdPhone: sale.callerIdPhone,
      phone: sale.phone,
      saleDate: sale.saleDate ? toDate(sale.saleDate, { timeZone }) : null,
      internetPlanSpeed: sale.internetPlanSpeed,
      paymentMethod: sale.paymentMethod,
      internetType: sale.interntType,
      installationDate: sale.installationDate
        ? toDate(sale.installationDate, { timeZone })
        : null,
      installationShift: sale.installationShift,
      customerName: sale.customerName,
      serviceOrder: sale.serviceOrder,
      extension: sale.extension,
      status: sale.status,
      observation,
    });

    setShowObservationModal(false);
    navigate("/");
  }

  interface ConfirmDeleteModalProps {
    onConfirm: () => void;
    onCancel: () => void;
  }

  function ConfirmDeleteModal({
    onConfirm,
    onCancel,
  }: ConfirmDeleteModalProps) {
    return (
      <ModalOverlay>
        <ModalBox>
          <p>Tem certeza que deseja excluir?</p>
          <ModalButtons>
            <button onClick={onConfirm}>Sim</button>
            <button onClick={onCancel}>Não</button>
          </ModalButtons>
        </ModalBox>
      </ModalOverlay>
    );
  }

  const [showModal, setShowModal] = useState(false);

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  const [showObservationModal, setShowObservationModal] = useState(false);

  function handleOpenObservationModal() {
    setShowObservationModal(true);
  }

  function handleCloseObservationModal() {
    setShowObservationModal(false);
  }

  async function confirmDeleteSale(id: string) {
    await api.delete(`sales/${id}`);
    setShowModal(false);
    navigate("/");
  }

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; // ou ''
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  useEffect(() => {
    if (showObservationModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; // ou ''
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showObservationModal]);

  return (
    <>
      {showModal && (
        <ConfirmDeleteModal
          onConfirm={() => confirmDeleteSale(sale.id)}
          onCancel={handleCloseModal}
        />
      )}

      {showObservationModal && (
        <>
          <ModalOverlay>
            <ObservationModalBox>
              <ObservationTextArea
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
              ></ObservationTextArea>
              {user.role === "seller" && (
                <ObservationModalButtons>
                  <button onClick={handleCloseObservationModal}>
                    Sair sem salvar
                  </button>
                  <button onClick={() => handleChangeObservation(sale.id)}>
                    Salvar
                  </button>
                </ObservationModalButtons>
              )}
              {user.role === "supervisor" && (
                <ObservationModalButtons>
                  <button onClick={handleCloseObservationModal}>Sair</button>
                </ObservationModalButtons>
              )}
            </ObservationModalBox>
          </ModalOverlay>
        </>
      )}

      <Container
        style={{
          border:
            sale.status === "Instalada"
              ? "1px solid #0a8d3c"
              : sale.status === "Cancelada"
              ? "1px solid #a80f14"
              : sale.status === "Com_pendencia"
              ? "1px solid #dfc011"
              : sale.status === "Aguardando_pagamento"
              ? "1px solid #dfc011"
              : sale.status === "Pendencia_tecnica"
              ? "1px solid #dfc011"
              : sale.status === "Draft"
              ? "1px solid #dfc011"
              : sale.status === "Sem_slot"
              ? "1px solid #dfc011"
              : sale.status === "Em_aprovisionamento"
              ? "1px solid #312E38"
              : "1px solid #312E38",
          backgroundColor:
            sale.status === "Instalada"
              ? "#35530e99"
              : sale.status === "Cancelada"
              ? "#82181a84"
              : sale.status === "Com_pendencia"
              ? "#f0b00061"
              : sale.status === "Aguardando_pagamento"
              ? "#f0b00061"
              : sale.status === "Pendencia_tecnica"
              ? "#f0b00061"
              : sale.status === "Draft"
              ? "#f0b00061"
              : sale.status === "Sem_slot"
              ? "#f0b00061"
              : sale.status === "Em_aprovisionamento"
              ? "#312E38"
              : "#312E38",
        }}
      >
        <SaleContent>
          <div>
            <div>
              <CpfCnpj>
                {sale.cpfCnpj.trim().replace(/\D/g, "")?.length === 11 ? (
                  <TfiHome size={12} />
                ) : (
                  <PiBuildingOfficeLight size={16} />
                )}
                <span>
                  {sale.cpfCnpj.trim().replace(/\D/g, "")?.length === 11
                    ? `CPF:`
                    : `CNPJ:`}
                </span>
              </CpfCnpj>
              <p>{sale.cpfCnpj}</p>
            </div>
            <p>
              <span>UF:</span> {sale.region}
            </p>
            <p>
              <span>Ticket:</span> {sale.ticket}
            </p>
          </div>
          <div>
            <p>
              <span>N° Binado:</span>
              <br /> {sale.callerIdPhone}
            </p>
            <p>
              <span>N° Contato:</span>
              <br /> {sale.phone}
            </p>
          </div>
          <div>
            <p>
              <span>Data da Venda:</span>
              <br /> {formattedSaleDate}
            </p>
            <p>
              <span>Velocidade:</span> {sale.internetPlanSpeed}
            </p>
            <p>
              <span>Pagamento:</span> {sale.paymentMethod}
            </p>
          </div>
          <div>
            <p>
              <span>Data da Instalação:</span>
              <br /> {formattedInstallationDate}
            </p>
            <p>
              <span>Horário:</span> {sale.installationShift}
            </p>
            <p>
              <span>Tipo:</span> {sale.internetType}
            </p>
          </div>
          <div>
            <p>
              <span>Nome do Cliente:</span>
              <br /> {sale.customerName}
            </p>
            <p>
              <span>Os:</span> {sale.serviceOrder}
            </p>
            <p>
              <span>Ramal:</span> {sale.extension}
            </p>
          </div>
          <div>
            <p>
              <span>Status: </span>
              {transformStatus(sale.status) === ""
                ? "Em aprovisionamento"
                : transformStatus(sale.status)}
            </p>
            <Observation>
              <span>Observação:</span>
              <textarea
                value={observation ?? ""}
                onChange={(e) => setObservation(e.target.value)}
                onClick={handleOpenObservationModal}
              >
                {sale.observation}
              </textarea>
              {/* {user.role === "supervisor" && (
              <button onClick={() => handleChangeObservation(sale.id)}>
                Salvar
              </button>
            )} */}
            </Observation>
          </div>
        </SaleContent>
        <Footer>
          {user.role === "supervisor" && (
            <Agent>
              <li>{sale.user.name}</li>
              <li>{sale.user.employeeId}</li>
            </Agent>
          )}
          <SaleButtons>
            <div className="leftbtns">
              {user.employeeId === sale.user.employeeId && (
                <button
                  onClick={() => handleEditSale(sale.id)}
                  style={{
                    backgroundColor: "#cdcd69",
                    color: "black",
                  }}
                >
                  Editar
                </button>
              )}
              {user.employeeId === sale.user.employeeId && (
                // <button type="submit" onClick={() => handleDeleteSale(sale.id)}>
                <button type="button" onClick={handleOpenModal}>
                  Excluir
                </button>
              )}
            </div>
            {user.role === "seller" && (
              <ObservationBtn>
                <button onClick={() => handleChangeObservation(sale.id)}>
                  Salvar
                </button>
              </ObservationBtn>
            )}
          </SaleButtons>
        </Footer>
      </Container>
    </>
  );
}
