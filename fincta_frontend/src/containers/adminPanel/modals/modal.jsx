// import React, { useState } from "react";
// import { Row } from "antd";
// import {
//   StyledButton,
//   Background,
//   StyledHeadingCol,
//   StyledCol,
//   StyledCard,
// } from "../../transactions/modal/styles/modal.styles";
// import {
//   CustomInput,
//   CustomDropdown,
// } from "../../transactions/modal/components";

// const Modal = (props) => {
//   const handleCancel = () => {
//     props.setVisibleSecondModal(false);
//     props.setVisible(true);
//   };

//   const onBackgroundClick = (event) => {
//     event.preventDefault();
//     if (event.target === event.currentTarget) {
//       props.setVisibleSecondModal(false);
//       props.setVisible(true);
//     }
//   };

//   const getInputs = (inputs = []) => {
//     console.log(Math.ceil(inputs.length / 4));
//     let totalCols = Math.ceil(inputs.length / 4);
//     let colWidth = 24 / totalCols;
//     let renderColArray = [];
//     let renderInputArray = [];
//     for (let i = 0; i < inputs.length; i++) {
//       let input = inputs[i];
//       if (input.type === "dropDown") {
//         renderInputArray.push(
//           <CustomDropdown
//             creatable={false}
//             title={input.name}
//             options={input.options}
//             onChange={(value) => input.setValue(value)}
//           />
//         );
//       } else {
//         renderInputArray.push(
//           <CustomInput
//             value={props.name}
//             title={input.name}
//             type={input.type}
//             setValue={input.setValue}
//           />
//         );
//       }
//       if (((i + 1) / 4) % 1 === 0) {
//         renderColArray.push(
//           <StyledCol span={colWidth}>{renderInputArray}</StyledCol>
//         );
//         renderInputArray = [];
//       }
//     }
//     renderColArray.push(
//       <StyledCol span={colWidth}>{renderInputArray}</StyledCol>
//     );
//     return renderColArray;
//   };

//   return (
//     <>
//       {props.visibleSecondModal ? (
//         <Background onClick={onBackgroundClick}>
//           <div style={{ width: "60%", marginLeft: "-140px" }}>
//             <StyledCard>
//               <Row style={{ height: "100%" }}>
//                 <StyledHeadingCol span={24}>Add Asset</StyledHeadingCol>
//                 {getInputs(props.inputs)}
//                 {/* <StyledCol span={12}>
//                   <CustomInput title="Asset Name" />
//                   <CustomInput title="Asset Type" />
//                   <CustomInput title="Useful Life" />
//                   <CustomInput title="Asset Description" />
//                 </StyledCol>
//                 <StyledCol span={12}>
//                   <CustomInput title="Identification Number" />
//                   <CustomInput title="Perishable/Non-Perishable" />
//                   <CustomInput title="Movable/Immovable" />
//                   <CustomInput title="Used/New" />
//                 </StyledCol> */}
//               </Row>
//             </StyledCard>
//             <br />
//             <StyledButton key="submit" type="primary" onClick={handleCancel}>
//               Add Asset
//             </StyledButton>
//           </div>
//         </Background>
//       ) : null}
//     </>
//   );
// };

// export default Modal;
