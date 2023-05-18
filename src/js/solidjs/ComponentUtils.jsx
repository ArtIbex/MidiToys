import { createSignal, createEffect } from 'solid-js';
import { ToyManager } from "../miditoy/ToyManager";

const tManager = new ToyManager();

export function InitToy(channel, toy, ToyChanged) {
    toy = tManager.GetToy(channel);
    // toy.UnsubscribeFromToyChangedEvent(ToyChanged);
    if(toy != undefined) {
        toy.SubscribeToToyChangedEvent(ToyChanged);
        return toy;
    }
}

export function UnsubscribeEvent(targetFunction) {
    toy.UnsubscribeFromToyChangedEvent(targetFunction);
}

export function CreateToy(channel, type) {
    //If toyType changed, create toy, otherwise, just udpate
    switch(type) {
        case 0: tManager.CreateEmptyToy(channel);       break;
        case 1: tManager.CreateGraviBoard(channel);     break;
        case 2: tManager.CreatePolyDrum(channel);       break;
        // case 3: tManager.CreateSquareKeyboard(channel, numberOfKeys, startKey); break;
        default: tManager.CreateEmptyToy(channel);      break;
    }
    return tManager.GetToy(channel);
}

export function DetailsFillerCenter(summeryName, content) {
    return (
      <details class="marginAuto">
        <summary class="textAlignCenter marginAuto">
          {summeryName}
        </summary>
        <br />
        {content}
      </details>
    );
}

export function SliderInput(props) {
  const [value, setValue] = createSignal(props.value);
  if(props.class == undefined) props.class = "sliderInput marginLeft10";
  var factor = props.factor;
  if(factor == undefined) factor = 1;

  // Synchronize the value prop with changes from the outside
  createEffect(() => {
    setValue(props.value);
  });

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    setValue(newValue);
    props.onChange(newValue / factor);
  };
  
  return(
    <input
        class={props.class}
        type="range"
        min={props.minMaxStep[0]}
        max={props.minMaxStep[1]}
        step={props.minMaxStep[2]}
        value={value() * factor}
        onChange={handleChange}
    />
  );
}

export function NumberInput(props) {
  const [value, setValue] = createSignal(props.value);
  if(props.class == undefined) props.class = "numberInput";
  var factor = props.factor;
  if(factor == undefined) factor = 1;

  createEffect(() => {
    setValue(props.value);
  });

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    setValue(newValue);
    props.onChange(newValue / factor); 
  };

  return (
    <input
      class={props.class}
      type="number"
      min={props.minMaxStep[0]}
      max={props.minMaxStep[1]}
      step={props.minMaxStep[2]}
      value={value() * factor}
      onChange={handleChange}
    />
  );
}

export function CheckboxInput(props) {
  const [checked, setChecked] = createSignal(props.checked);

  createEffect(() => {
    setChecked(props.checked);
  });

  const handleChange = () => {
    setChecked(!checked());
    props.onChange(checked());
  };

  return (
    <input
      class="toggleInput"
      type="checkbox"
      checked={checked()}
      onChange={handleChange}
    />
  );
}

export function NumberSliderCombo(props) {
  return(
    <div class="flexContainer">
      <NumberInput
          factor={props.factor}
          minMaxStep={props.minMaxStep}
          value={props.value}
          onChange={props.onChange}
      />
      <SliderInput
          factor={props.factor}
          minMaxStep={props.minMaxStep}
          value={props.value}
          onChange={props.onChange}
      />
    </div>
  )
}

export function CheckboxUIElement(props) {
  return(
    <div class="flexContainer">
      <div>{props.name}</div>
      <CheckboxInput 
        checked={props.checked}
        onChange={props.onChange}
      />
    </div>
  )
}

export function NumberSliderUIElement(props) {
  if(props.name == undefined) props.name = "define props.name pls";
  return(
    <div class="flexContainer">
      <div>{props.name}</div>
      <NumberSliderCombo 
        factor={props.factor}
        minMaxStep={props.minMaxStep}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}