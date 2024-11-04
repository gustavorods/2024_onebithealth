import React, {useState} from "react"
import {TextInput, 
        View, 
        Text, 
        TouchableOpacity,
        Vibration,
        Pressable,
        Keyboard,
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
    let heightFormat = heigh.replace(",", ".") // Se o calculo for feito com ",", vai dar erro.
    return setImc((weight/(heightFormat*heightFormat)).toFixed(2))
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
    } else {
        verificationImc()
        setImc(null)
        setTextButton("Calcular")
        setMessageImc("Preencha o peso e altura")
    }
}

    return(
            <View style={styles.FormContext}> 
            {imc == null ? 
            <Pressable onPress={Keyboard.dismiss} style={styles.form}>
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
            </Pressable>
            :
            <View style={styles.exhibitionResultImc}>
                <ResultImc messageResultImc={messageImc} resultImc={imc}/>
                <TouchableOpacity
                onPress={() => validationImc()}
                style={styles.buttonCalculator}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            }
        </View>
    );
}