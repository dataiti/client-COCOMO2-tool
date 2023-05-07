import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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

const HomePage = () => {
  const [sizingMethod, setSizingMethod] = useState("SLOC");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      sizeType: "SLOC",
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
    setValue("sizeType", sizingMethod);
  };

  const handleSubmitCalculatorCocomo = async (values) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col gap-3 px-8 py-2 bg-slate-100">
      <div className="flex items-center justify-center p-4">
        <h3 className="font-bold text-2xl">
          COCOMO II - Constructive Cost Model
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(handleSubmitCalculatorCocomo)}
        className="flex flex-col gap-2"
      >
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
            <div className="grid grid-cols-9 gap-4">
              <div></div>
              <Label label="SLOC" className="text-blue-600 underline" />
              <Label label="% Design Modified" />
              <Label label="% Code Modified" />
              <Label label="% Integration Required" />
              <Label label="Assessment and Assimilation (0% - 8%)" />
            </div>
            <div className="grid grid-cols-9 gap-2">
              <Label label="New" />
              <Input name="newSize" control={control} />
            </div>
            <div className="grid grid-cols-9 gap-2">
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
            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-3 flex items-center gap-2">
                <Label label="Unadjusted Function Points" />
                <Input name="functionPoints" control={control} />
              </div>
              {languageFactor.map((item, index) => (
                <div className="col-span-3 flex items-center gap-2" key={index}>
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
        <div>
          <Button>Calculate</Button>
        </div>
        <div className="h-[2px] w-full bg-gray-500 rounded-full"></div>
        <div className="flex flex-col gap-2">
          <Label label="Results" isTitle />
          <div>
            <Label
              label="Software Development (Elaboration and Construction) Staffing Profile"
              isTitle
            />
          </div>
          <ResultItem label="Effort" unit="Person-months" />
          <ResultItem label="Schedule" unit="Months" />
          <ResultItem label="Cost" unit="$" />
          <ResultItem label="Total Equivalent Size" unit="SLOC" />
          <ResultItem label="Effort Adjustment Factor (EAF)" />
        </div>
      </form>
    </div>
  );
};

export default HomePage;
