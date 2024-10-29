import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Calcutate = () => {
  const [amount, setAmount] = useState(100);
  const [interest, setInterest] = useState(1.2);
  const [period, setPeriod] = useState(1);
  const [reinvest, setReinvest] = useState();
  const [calculate, setCalculate] = useState();
  const [returnValue, setreturnValue] = useState(0);
  const [reinvestAmount, setReinvestAmount] = useState();


  const optionData = [
    { name: "Daily", value: "Daily" },
    { name: "Weekly", value: "Weekly" },
    { name: "Monthly", value: "Monthly" },
  ];

  const handleChange = (event) => {
    const { value, min, max } = event.target;

    // let reinvest = Math.max(Number(min), Math.min(Number(max), Number(value)));
    let reinvest = event.target.value;

    var compoundValueDaily =
      ((reinvest * amount) / 100) * Math.pow(1 + interest / 100, period);
    // setReinvestAmount(reinvestAmount)
    setreturnValue(compoundValueDaily.toFixed(2));
    setReinvest(reinvest);
  };

  const handleChangeInt = (event) => {
    const { value, min, max } = event.target;
    // let interest = Math.max(Number(min), Math.min(Number(max), Number(value)));
    let interest = event.target.value;

    var compoundValueDaily =
      ((reinvest * amount) / 100) * Math.pow(1 + interest / 100, period);
    // setReinvestAmount(reinvestAmount)
    setreturnValue(compoundValueDaily.toFixed(2));
    setInterest(interest);
    handleCalculation();
  };

  const handleChangeAmt = (event) => {
    const { value, min, max } = event.target;
    // let amount = Math.max(Number(min), Math.min(Number(max), Number(value)));

    let amount = event.target.value;
    var compoundValueDaily =
      ((reinvest * amount) / 100) * Math.pow(1 + interest / 100, period);
    // setReinvestAmount(reinvestAmount)
    setreturnValue(compoundValueDaily.toFixed(2));
    setAmount(amount);
    handleCalculation();
  };

  const handleChangePeriod = (event) => {
    const { value } = event.target;
    setPeriod(value);
    handleCalculation(value);
  };

  const handleCalculation = (period) => {
    const a =
      parseFloat(amount) *
      (parseFloat(interest) / parseFloat(100)) *
      (30 * parseFloat(period));
    const b = parseFloat(a) + parseFloat(amount);
    const c = parseFloat(b) * parseFloat(0.05);
    const d = parseFloat(b) - parseFloat(c);

    setCalculate({
      projectedValue: d,
      projectedClaimable: b,
    });
  };

  useEffect(() => {
    const reinvestAmount = (reinvest * amount) / 100;
    var compoundValueDaily =
      reinvestAmount * Math.pow(1 + interest / 100, period);
    setReinvestAmount(reinvestAmount);
    setreturnValue(compoundValueDaily.toFixed(2));
    handleCalculation(period);
  }, [period, amount, interest]);

  const getChangevalue = (e) => {
    const value = e.target.value;
    var compoundValueDaily =
      reinvestAmount * Math.pow(1 + interest / 100, period);
    var compoundValueWeekly =
      reinvestAmount * Math.pow(1 + interest / 100, period * 7);
    var compoundValueMonthly =
      reinvestAmount * Math.pow(1 + interest / 100, period * 30);

    // eslint-disable-next-line default-case
    switch (value) {
      case "Daily":
        setreturnValue(compoundValueDaily.toFixed(2));
        break;
      case "Weekly":
        setreturnValue(compoundValueWeekly.toFixed(2));
        break;
      case "Monthly":
        setreturnValue(compoundValueMonthly.toFixed(2));
        break;
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p>Calculate Earnings</p>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-12">
            <div className="panel">
              <div className="p-4">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <p className="mb-2">Amount ($)</p>
                    <form className="row mb-4">
                      <div className="col-12">
                        <input
                          className="form-control text-secondary"
                          type="number"
                          id="amount"
                          // min="0"
                          // max="1000000000000000000000"
                          value={amount}
                          placeholder="100"
                          aria-label="default input example"
                          onChange={(event) => handleChangeAmt(event)}
                          onKeyDown={(e) => {
                            if (e.which == 13) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2">Average Daily Interest Rate (%)</p>
                    <form className="row">
                      <div className="col-12">
                        <input
                          className="form-control text-secondary"
                          type="number"
                          id="interestrate"
                          // min="0"
                          // max="100"
                          value={interest}
                          placeholder="0.00"
                          aria-label="default input example"
                          onChange={(event) => handleChangeInt(event)}
                          onKeyDown={(e) => {
                            if (e.which == 13) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label for="customRange2" className="form-label">
                      Held for Period
                    </label>
                  </div>
                  <div className="col-md-10 mb-4">
                    <input
                      type="range"
                      className="form-range"
                      min="1"
                      max="16"
                      step="1"
                      id="customRange2"
                      defaultValue={period}
                      onChange={handleChangePeriod}
                    />
                  </div>
                  <div className="col-md-2 mb-4">
                    <h4 className="fw-normal mb-0">{period} Months</h4>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-md-12">
                    <p className="mb-2"> Reinvestment Percentage (%)</p>
                  </div>
                  <div className="col-md-6">
                    <form className="row mb-4">
                      <div className="col-12">
                        <input
                          className="form-control text-secondary"
                          type="number"
                          id="reinvestmentpercentage"
                          // min="0"
                          // max="100"
                          value={reinvest}
                          placeholder="0.00"
                          aria-label="default input example"
                          onChange={(event) => handleChange(event)}
                          onKeyDown={(e)=>{
                            if (e.which == 13) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="col-md-6">
                    <form className="row">
                      <div className="col-12 col-md-4">
                        <select
                          id="inputState"
                          className="form-select text-left text-secondary"
                          onKeyDown={(e)=>e.preventDefault()}
                          onChange={(e) =>  getChangevalue(e)}
                        >


                          {optionData.map((item) => {
                            return (
                              <option value={item.value}>{item.name}</option>
                            )
                          })}
                        </select>
                      </div>
                    </form>
                  </div>
                </div> */}
              </div>

              <div className="bg-secondary bg-opacity-10 p-4 rounded-bottom-4">
                <div className="row">
                  <div className="col-md-2 ms-auto mb-4">
                    <p>Projected Claimable</p>
                    <h4 className="fw-normal mb-0">
                      $
                      {!calculate || isNaN(calculate.projectedValue)
                        ? 0
                        : parseFloat(calculate.projectedValue).toFixed(2)}
                    </h4>
                  </div>
                  <div className="col-md-10 mt-2 mt-md-0">
                    <p>Projected Value</p>
                    <h4 className="fw-normal mb-0">
                      $
                      {!calculate || isNaN(calculate.projectedClaimable)
                        ? 0
                        : parseFloat(calculate.projectedClaimable).toFixed(2)}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calcutate;
