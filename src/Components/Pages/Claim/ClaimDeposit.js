import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import {
   SetBNBWithdraw,
   getBNBDeposits_active,
   getBNBDeposits_depositAmount,
   getBNBDeposits_depositDate,
   getBNBDeposits_endDate,
   getBNBUserDepositsIds
} from '../../../ABI/bnbcontractAction';
import {
   SetBUSDWithdraw,
   getBUSDUserDepositsIds,
   getBUSDeposits_depositDate,
   getBUSDeposits_depositAmount,
   getBUSDDeposits_endDate,
   getBUSDDeposits_active
} from '../../../ABI/busdcontractAction';
import {
   SetMaticWithdraw,
   getMATICDeposits_active,
   getMATICDeposits_depositAmount,
   getMATICDeposits_depositDate,
   getMATICDeposits_endDate,
   getMATICUserDepositsIds
} from '../../../ABI/maticcontractAction';

import {
   SetUSDCWithdraw,
   getUSDCUserDepositsIds,
   getUSDCDeposits_depositDate,
   getUSDCDeposits_depositAmount,
   getUSDCDeposits_endDate,
   getUSDCDeposits_active
} from "../../../ABI/usdccontractAction";




const customStyles = {
   rows: {
       style: {
           minHeight: '72px', // override the row height
           fontSize:"18px",
           backgroundColor: "#f4f4f5"
       },
   },
   headCells: {
       style: {
           paddingLeft: '8px', // override the cell padding for head cells
           paddingRight: '8px',
           fontSize: "18px",
           fontWeight: "bold",
           backgroundColor: "#f4f4f5"
       },
   },
   cells: {
       style: {
           paddingLeft: '8px', // override the cell padding for data cells
           paddingRight: '8px',
           backgroundColor: "#f4f4f5"
       },
   },
};


function ClaimDeposit({wallet2,account1}) {

   const [depositData, setdepositData] = useState([])
   const [network, setNetwork] = useState("BNB")
   

   useEffect(() => {

      const getId = async () => {
         const Depo_id = await getBNBUserDepositsIds();

         Depo_id.map(async (item, i) => {

            const depoDate = await getBNBDeposits_depositDate(item);
            const depoAmount = await getBNBDeposits_depositAmount(item);
            const endData = await getBNBDeposits_endDate(item);
            const depoActive = await getBNBDeposits_active(item);

            const newObj = {
               date: depoDate,
               deposit_Id: item,
               Amount: depoAmount,
               lock_Ends: endData,
               isActive: depoActive
            }

            setdepositData((prevState) => { 
                  return [...prevState, newObj]
            })
         })
      }
      getId()
   }, [])


   const getWithdraw = async (id, e) => {
      e.preventDefault()
      const value = e.target.value

      switch (value) {
         case "BNB":
            await SetBNBWithdraw(id)
            break;
         case "BUSD":
            await SetBUSDWithdraw(id)
            break;
         case "MATIC":
            await SetMaticWithdraw(id)
            break;
         case "USDC":
            await SetUSDCWithdraw(id)
            break;
         default:
      }
      // await SetUSDCWithdraw(id);
   }


   let currentDate = new Date();
   let currenttimestamp = currentDate.toLocaleDateString('en-GB');
   


   const columns = [
      {
         name: "Date",
         selector: row => row.date
      },
      {
         name: "Deposit Id",
         selector: row => row.deposit_Id,
         sortable: true,
      },
      {
         name: "Amount",
         selector: row => row.Amount
      },
      {
         name: "Lock Ends",
         selector: row => row.lock_Ends
      },
      {
         name: "Action",
         cell: (row) => (
            <button class="btn btn-secondary  pt-2" disabled={currenttimestamp >= row.lock_Ends? true: false} value={network} onClick={(e) => { getWithdraw(row.deposit_Id, e) }}>Claim</button>
         )
      }
   ]

   const showBUSDWithdrawData = async () => {

      setdepositData([])
      setNetwork("BUSD")
      
      const Depo_id = await getBUSDUserDepositsIds();
      Depo_id.map(async (item, i) => {

         const depoDate = await getBUSDeposits_depositDate(item);
         const depoAmount = await getBUSDeposits_depositAmount(item);
         const endData = await getBUSDDeposits_endDate(item);
         const depoActive = await getBUSDDeposits_active(item);

         const newObj = {
            date: depoDate,
            deposit_Id: item,
            Amount: depoAmount,
            lock_Ends: endData,
            isActive: depoActive
         }

         setdepositData((prevState) => { 
            const itemExists = prevState?.some(key =>key.deposit_Id === item)
            if(!itemExists){
               return [...prevState, newObj]
            }
            return prevState
         })
      })
   }

   const showMATICWithdrawData = async () => {

      setdepositData([])
      setNetwork("MATIC")
      const Depo_id = await getMATICUserDepositsIds();

      Depo_id.map(async (item, i) => {

         const depoDate = await getMATICDeposits_depositDate(item);
         const depoAmount = await getMATICDeposits_depositAmount(item);
         const endData = await getMATICDeposits_endDate(item);
         const depoActive = await getMATICDeposits_active(item);

         const newObj = {
            date: depoDate,
            deposit_Id: item,
            Amount: depoAmount,
            lock_Ends: endData,
            isActive: depoActive
         }

         setdepositData((prevState) => { 
            const itemExists = prevState?.some(key =>key.deposit_Id === item)
            if(!itemExists){
               return [...prevState, newObj]
            }
            return prevState
         })
      })
   }

   const showBNBWithdrawData = async () => {

      setdepositData([])
      setNetwork("BNB")
      const Depo_id = await getBNBUserDepositsIds();

      Depo_id.map(async (item, i) => {

         const depoDate = await getBNBDeposits_depositDate(item);
         const depoAmount = await getBNBDeposits_depositAmount(item);
         const endData = await getBNBDeposits_endDate(item);
         const depoActive = await getBNBDeposits_active(item);

         const newObj = {
            date: depoDate,
            deposit_Id: item,
            Amount: depoAmount,
            lock_Ends: endData,
            isActive: depoActive
         }

         setdepositData((prevState) => { 
            const itemExists = prevState?.some(key =>key.deposit_Id === item)
            if(!itemExists){
               return [...prevState, newObj]
            }
            return prevState
         })
      })
   }

   const showUSDCWithdrawData = async () => {

      setdepositData([])
      setNetwork("USDC")
      const Depo_id = await getUSDCUserDepositsIds();

      Depo_id.map(async (item, i) => {

         const depoDate = await getUSDCDeposits_depositDate(item);
         const depoAmount = await getUSDCDeposits_depositAmount(item);
         const endData = await getUSDCDeposits_endDate(item);
         const depoActive = await getUSDCDeposits_active(item);

         const newObj = {
            date: depoDate,
            deposit_Id: item,
            Amount: depoAmount,
            lock_Ends: endData,
            isActive: depoActive
         }

         setdepositData((prevState) => { 
            const itemExists = prevState?.some(key =>key.deposit_Id === item)
            if(!itemExists){
               return [...prevState, newObj]
            }
            return prevState
         })
      })
   }

   return (
      <div className='container'>
         <div class="row">
            <div class="col-md-12">
               <p>Claim Deposit</p>
            </div>
         </div>
         <div class="row mb-5">
            <div class="col-lg-8 mb-4 mb-lg-0 mt-lg-2">
               <div class="panel p-4">
                  <div class="row mb-2">
                     <div class="col-10 col-md-auto mb-2 mb-md-0">
                        <div class="row">
                           <div class="col-auto mb-3 px-2">
                              <input type="radio" class="btn-check" name="claim-deposit" id="claim-deposit-bnb"  autocomplete="off" defaultChecked />
                              <label onClick={() => showBNBWithdrawData()} class="btn btn-outline-secondary" for="claim-deposit-bnb">
                                 <div class="hstack gap-2">
                                    <div><img src="images/icon-bnb.svg" alt="bnb" height="24" /></div>
                                    <div class="mt-1">BNB</div>
                                 </div>
                              </label>
                           </div>
                           <div class="col-auto mb-3 px-2">
                              <input type="radio" class="btn-check" name="claim-deposit" id="claim-deposit-busd" autocomplete="off" />
                              <label onClick={() => showBUSDWithdrawData()} class="btn btn-outline-secondary" for="claim-deposit-busd">
                                 <div class="hstack gap-2">
                                    <div><img src="images/icon-busd.svg" alt='busd' height="24" /></div>
                                    <div class="mt-1">BUSD</div>
                                 </div>
                              </label>
                           </div>
                           <div class="col-auto mb-3 px-2">
                              <input type="radio" class="btn-check" name="claim-deposit" id="claim-deposit-matic" autocomplete="off" />
                              <label onClick={() => showMATICWithdrawData()} class="btn btn-outline-secondary" for="claim-deposit-matic">
                                 <div class="hstack gap-2">
                                    <div><img src="images/icon-matic.svg" alt="matic" height="24" /></div>
                                    <div class="mt-1">MATIC</div>
                                 </div>
                              </label>
                           </div>
                           <div class="col-auto mb-3 px-2">
                              <input type="radio" class="btn-check" name="claim-deposit" id="claim-deposit-usdc" autocomplete="off" />
                              <label onClick={() => showUSDCWithdrawData()} class="btn btn-outline-secondary" for="claim-deposit-usdc">
                                 <div class="hstack gap-2">
                                    <div><img src="images/icon-usdc.svg" alt="usdc" height="24" /></div>
                                    <div class="mt-1">USDC</div>
                                 </div>
                              </label>
                           </div>
                        </div>
                     </div>
                     <div class="col-2 col-md-auto ms-md-auto">
                     </div>
                  </div>
                  <form class="row g-3">
                     <div class="col-12 ">
                       {
                        wallet2 && account1 ?
                        <div class="col-md-12 mt-md-2">
                        <DataTable
                           columns={columns}
                           data={depositData.filter(value => value.isActive === true)}
                           fixedHeader
                           pagination
                           paginationPerPage={10}
                           customStyles={customStyles}
                        />
                     </div>
                     :
                     null
                       }
                     </div>
                     <div class="d-grid gap-2 col-6 col-md-2 mx-auto">
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ClaimDeposit


