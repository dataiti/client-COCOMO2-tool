import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  personnel,
  softwareCostDriversProduct,
  softwareScaleDrivers,
  platform,
  project,
  softwareSize,
  languageFactor,
} from "../utils/constant";
import Factorial from "../components/Factorial";
import Label from "../components/Label";
import Select from "../components/Select";
import Button from "../components/Button";
import Input from "../components/Input";
import ResultItem from "../components/ResultItem";
import {
  calculateFunctionPointsThunkAction,
  calculateSelect,
  clearResult,
} from "../redux/features/caculateSlice";
import Loading from "../components/Loading";
import Wrapper from "../components/Wrapper";

const CalculatePage = () => {
  const [sizingMethod, setSizingMethod] = useState("SLOC");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { result } = useSelector(calculateSelect);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      projectName: "",
      language: "basic",
      functionPoints: "",
      newSize: "",
      reusedSize: "",
      reusedIM: "",
      reusedAA: "",
      PREC: "nominal",
      FLEX: "nominal",
      RESL: "nominal",
      TEAM: "nominal",
      PMAT: "nominal",
      RELY: "nominal",
      DATA: "nominal",
      CPLX: "nominal",
      RUSE: "nominal",
      DOCU: "nominal",
      ACAP: "nominal",
      PCAP: "nominal",
      PCON: "nominal",
      AEXP: "nominal",
      PEXP: "nominal",
      LTEX: "nominal",
      TIME: "nominal",
      STOR: "nominal",
      PVOL: "nominal",
      TOOL: "nominal",
      SITE: "nominal",
      SCED: "nominal",
      softwareMaintenance: "Off",
      softwareLaborCostPerPM: "",
    },
  });

  const handleChangeTypeSizingMethod = (e) => {
    setSizingMethod(e.target.value);
    dispatch(clearResult());
    reset();
  };

  const handleSubmitCalculatorCocomo = async (values) => {
    try {
      let formatData = { ...values, sizeType: sizingMethod };
      setIsLoading(true);
      if (sizingMethod === "FP") {
        await dispatch(
          calculateFunctionPointsThunkAction({ data: formatData })
        );
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  console.log(result);

  return (
    <div className="flex flex-col gap-3 px-10 py-2 bg-slate-200/80">
      {isLoading && <Loading />}
      <div className="flex items-center justify-center p-4">
        <h3 className="font-extrabold text-2xl">
          COCOMO II - Constructive Cost Model
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(handleSubmitCalculatorCocomo)}
        className="flex flex-col gap-2"
      >
        <div className="grid grid-cols-6 gap-2">
          <div className="col-span-2">
            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-3 flex flex-col gap-2">
                <Label label="Project Name" isTitle />
                <Input name="projectName" control={control} />
              </div>
            </div>
            {sizingMethod === "SLOC" && (
              <div className="flex flex-col gap-2">
                <Label label="Type Model" isTitle />
                <div className="flex flex-col gap-2">
                  <div className="col-span-3 flex items-center gap-1">
                    <Input type="radio" name="typeModel" control={control} />
                    <Label label="Application Composition (Basic Mode)" />
                  </div>
                  <div className="col-span-3 flex items-center gap-1">
                    <Input type="radio" name="typeModel" control={control} />
                    <Label label="Early Design model (Intermediate Mode)" />
                  </div>
                  <div className="col-span-3 flex items-center gap-1">
                    <Input type="radio" name="typeModel" control={control} />
                    <Label label="Post- Architecture model (Advanced Mode)" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-span-4 flex flex-col gap-2">
            <div className="flex items-center gap-16">
              <Label label="Software Size" isTitle />
              {softwareSize.map((item, index) => (
                <div className="flex items-center gap-2" key={index}>
                  <Label label={item.title} />
                  <Select onChange={handleChangeTypeSizingMethod}>
                    {item.value.map((itemValue, index) => (
                      <option value={itemValue.value} key={index}>
                        {itemValue.key}
                      </option>
                    ))}
                  </Select>
                </div>
              ))}
            </div>
            {sizingMethod === "SLOC" ? (
              <>
                <div className="grid grid-cols-6 gap-4">
                  <div></div>
                  <Label
                    label="SLOC"
                    className="text-center text-blue-600 underline"
                  />
                  <Label label="% Design Modified" className="text-center" />
                  <Label label="% Code Modified" className="text-center" />
                  <Label
                    label="% Integration Required"
                    className="text-center"
                  />
                  <Label
                    label="Assessment and Assimilation (0% - 8%)"
                    className="text-center"
                  />
                </div>
                <div className="grid grid-cols-6 gap-2">
                  <Label label="New" />
                  <Input name="newSize" control={control} />
                </div>
                <div className="grid grid-cols-6 gap-2">
                  <Label label="Reuse" />
                  <Input name="reusedSize" control={control} />
                  <Input name="reusedDM" control={control} />
                  <Input name="reusedCM" control={control} />
                  <Input name="reusedIM" control={control} />
                  <Input name="reusedAA" control={control} />
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-7 gap-4">
                  <div className="col-span-4 flex items-center gap-2">
                    <Label label="Unadjusted Function Points" />
                    <Input name="functionPoints" control={control} />
                  </div>
                  {languageFactor.map((item, index) => (
                    <div
                      className="col-span-2 flex items-center gap-2"
                      key={index}
                    >
                      <Label label={item.title} />
                      <Controller
                        name="language"
                        control={control}
                        defaultValue="basic"
                        render={({ field }) => (
                          <Select field={field}>
                            {item.values.map((itemValue, index) => (
                              <option value={itemValue.value} key={index}>
                                {itemValue.key}
                              </option>
                            ))}
                          </Select>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Factorial
            factorial={softwareScaleDrivers}
            title=" Software Scale Drivers"
            control={control}
          />
          <Factorial
            factorial={softwareCostDriversProduct}
            title="Software Cost Drivers Product"
            control={control}
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Factorial
            factorial={personnel}
            title="Personnel"
            control={control}
          />
          <Factorial factorial={platform} title="Platform" control={control} />
          <Factorial factorial={project} title="Project" control={control} />
        </div>
        <div className="flex flex-col">
          <Label label="Software Labor Rates" isTitle />
          <div className="flex items-center gap-4">
            <Label label="Cost per Person-Month (Dollars)" />
            <Input name="softwareLaborCostPerPM" control={control} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              primary
              className="px-8 bg-emerald-900 hover:bg-emerald-800"
            >
              Calculate
            </Button>
            <Button primary className="px-8 bg-yellow-900 hover:bg-yellow-800">
              Save
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button primary className="px-8 bg-green-600 hover:bg-green-500">
              Import .CSV
            </Button>
            <Button primary className="px-8 bg-rose-900 hover:bg-rose-800">
              Export .CSV
            </Button>
          </div>
        </div>
        <div className="h-[2px] w-full bg-gray-500 rounded-full"></div>
        <div className="flex flex-col gap-2 ">
          <Label label="Results" isTitle />
          <div>
            <Label
              label="Software Development (Elaboration and Construction)"
              isTitle
            />
          </div>
          <Wrapper>
            <ResultItem
              label="Effort"
              unit="Person-months"
              result={result?.softwareEffort}
            />
            <ResultItem
              label="Schedule"
              unit="Months"
              result={result?.softwareSchedule}
            />
            <ResultItem label="Cost" unit="$" result={result?.cost} />
            <ResultItem
              label="Total Equivalent Size"
              unit="SLOC"
              result={result?.totalEquivalentSize}
            />
            <ResultItem
              label="Effort Adjustment Factor (EAF)"
              result={result?.softwareEAF}
            />
          </Wrapper>
        </div>
        <div>
          {/* <table className="w-full text-sm text-left  text-gray-400 cursor-pointer">
            <thead className="text-xs border-b  text-gray-700 uppercase bg-slate-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Phase
                </th>
                <th scope="col" className="px-6 py-3">
                  Effort (Person-months)
                </th>
                <th scope="col" className="px-6 py-3">
                  Schedule (Months)
                </th>
                <th scope="col" className="px-6 py-3">
                  Average Staff
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Cost (Dollars)
                </th>
              </tr>
            </thead>

            <tbody>
              {[" ", " ", " "].map((product, index) => {
                return (
                  <tr className="bg-white border-b hover:bg-gray-100 ">
                    <td className="px-6 text-sm py-2 text-gray-500">0</td>

                    <td className="px-6 text-sm py-2 text-gray-500">0</td>
                    <td className="px-6 py-2 text-gray-500 text-sm">0</td>
                    <td className="px-6 text-sm py-2 text-gray-500">0</td>
                    <td className="px-6 text-sm text-gray-500 py-2"></td>
                  </tr>
                );
              })}
            </tbody>
          </table> */}
        </div>
      </form>
    </div>
  );
};

export default CalculatePage;
