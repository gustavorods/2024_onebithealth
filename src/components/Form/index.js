import React, {useState} from "react"
import {TextInput, 
        View, 
        Text, 
        TouchableOpacity,
        Vibration,
    } from  "react-native"
import ResultImc from "./ResultImc/";
import styles from "./style"

export default function Form() {

const [heigh, setHeigh]=useState(null)
const [weight, setWeight]=useState(null)
const [messageImc, setMessageImc]=useState("Preencha o peso e altura")
const [imc,setImc]=useState(null)
const [textButton, setTextButton]=useState("Calcular")
const [errorMessage, setErrorMessage] = useState(null)

function imcCalculator() {
    return setImc((weight/(heigh*heigh)).toFixed(2))
}

function verificationImc() {
    if(imc == null) {
        Vibration.vibrate();
        setErrorMessage("Campo obrigatorio*")
    }
}

function validationImc() {
    if(weight != null && heigh != null) {
        imcCalculator()
        setHeigh(null)
        setWeight(null)
        setMessageImc("Seu imc é igual:")
        setTextButton("Calcular Novamente")
        setErrorMessage(null)
        return
    } else {
        verificationImc()
        setImc(null)
        setTextButton("Calcular")
        setMessageImc("Preencha o peso e altura")
    }
}

    return(
        <View style={styles.FormContext}>
            <View style={styles.form}> 
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput 
                onChangeText={setHeigh}
                value={heigh}
                placeholder="Ex. 1.75" 
                keyboardType="numeric"
                style={styles.input}></TextInput>
                
                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput 
                onChangeText={setWeight}
                value={weight}
                placeholder="Ex. 75" 
                keyboardType="numeric"
                style={styles.input}></TextInput>

                <TouchableOpacity
                onPress={() => validationImc()}
                style={styles.buttonCalculator}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            <ResultImc messageResultImc={messageImc} resultImc={imc}/>
        </View>
    );
}