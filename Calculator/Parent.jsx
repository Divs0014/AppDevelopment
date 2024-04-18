import {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import CustomButton from './Components/CustomButton';



export const Screen = () => {
  const [input, setInput] = useState('0');
  const [result, setResult] = useState('');
  const [isEqualClicked, setIsEqualClicked] = useState(false); // State variable to track if "=" has been clicked

  const clear = () => {
    setInput('0');
    setResult('');
    setIsEqualClicked(false); // Reset isEqualClicked state
  };

  const evaluateExpression = () => {
    try {
      const evalResult = eval(input);
      setResult(evalResult);

      if (isEqualClicked) {
        setInput(evalResult.toString()); // Update input with the result if "=" was clicked before
      }

      setIsEqualClicked(true); // Set isEqualClicked to true after "=" is clicked
    } catch (error) {
      setResult('Error');
    }
  };

  const digit = a => {
    setInput(prevInput => {
      if (prevInput === '0') {
        return String(a);
      } else {
        if (a === '%') {
          const expression = prevInput.replace(/[^-()\d/*+.]/g, '');
          const evalResult = eval(expression) / 100;
          setResult(evalResult.toString());
          return evalResult.toString();
        } else {
          return prevInput + String(a);
        }
      }
    });
  };
  const handleBackspace = () => {
    setInput(prevInput => {
      if (prevInput.length === 1) {
        return '0';
      }
      return prevInput.slice(0, -1);
    });
  };

  const fontWei = () => {
    const length = input.length;
    if (length <= 10) {
      return 50; // Default font size
    } else {
      return Math.max(50 - (length - 10) * 2, 20); // Adjusting font size dynamically, but minimum size is 20
    }
  };
  const toggleSign = () => {
    setInput(prevInput => {
      if (prevInput.charAt(0) === '-') {
        return prevInput.slice(1);
      } else {
        return '-' + prevInput;
      }
    });
  };

  return (
    <View style={styles.Container}>
      <View style={styles.res}>
        <TextInput
          style={[styles.result, {fontSize: fontWei()}]}
          value={input}
          editable={false}
        />
        <View style={styles.answer}>
          <Text style={styles.answerText}>{result}</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <View style={styles.row}>
          <View style={styles.opButton}>
            <CustomButton
              title="AC"
              color="#28282B"
              textColor="#C70039"
              onPress={() => clear()}
            />
          </View>
          <View style={styles.opButton}>
            <CustomButton
              title="⌫"
              color="#171717"
              textColor="#C70039"
              onPress={() => handleBackspace()}
            />
          </View>
          <View style={styles.opButton}>
            <CustomButton
              title="%"
              color="#171717"
              textColor="#E2988D"
              onPress={() => digit('%')}
            />
          </View>
          <View style={styles.opButton}>
            <CustomButton
              title="/"
              color="#171717"
              textColor="#E2988D"
              onPress={() => digit('/')}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.opButton}>
            <CustomButton title="1" color="#171717" onPress={() => digit(1)} />
          </View>
          <View style={styles.opButton}>
            <CustomButton title="2" color="#171717" onPress={() => digit(2)} />
          </View>
          <View style={styles.opButton}>
            <CustomButton title="3" color="#171717" onPress={() => digit(3)} />
          </View>
          <View style={styles.opButton}>
            <CustomButton
              title="*"
              color="#171717"
              textColor="#E2988D"
              onPress={() => digit('*')}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.opButton}>
            <CustomButton title="4" color="#171717" onPress={() => digit(4)} />
          </View>
          <View style={styles.opButton}>
            <CustomButton title="5" color="#171717" onPress={() => digit(5)} />
          </View>
          <View style={styles.opButton}>
            <CustomButton title="6" color="#171717" onPress={() => digit(6)} />
          </View>
          <View style={styles.opButton}>
            <CustomButton
              title="+"
              color="#171717"
              textColor="#E2988D"
              onPress={() => digit('+')}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.opButton}>
            <CustomButton title="7" color="#171717" onPress={() => digit(7)} />
          </View>
          <View style={styles.opButton}>
            <CustomButton title="8" color="#171717" onPress={() => digit(8)} />
          </View>
          <View style={styles.opButton}>
            <CustomButton title="9" color="#171717" onPress={() => digit(9)} />
          </View>
          <View style={styles.opButton}>
            <CustomButton
              title="-"
              color="#171717"
              textColor="#E2988D"
              onPress={() => digit('-')}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.opButton}>
            <CustomButton
              title="+/-"
              color="#171717"
              onPress={() => toggleSign()}
            />
          </View>
          <View style={styles.opButton}>
            <CustomButton title="0" color="#171717" onPress={() => digit(0)} />
          </View>
          <View style={styles.opButton}>
            <CustomButton
              title="."
              color="#171717"
              onPress={() => digit('.')}
            />
          </View>
          <View style={styles.opButton}>
            <CustomButton
              title="="
              color="#E2988D"
              textColor="#171717"
              onPress={() => evaluateExpression()}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'column',
  },
  res: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    color: 'white',
    padding: 20,
  },
  result: {
    flex: 3,
    fontFamily: 'Arial',
    fontSize: 50,
    fontWeight: '300',
    color: 'white',
  },
  answer: {
    flex: 1,
    color: 'black',
  },
  answerText: {
    flex: 1,
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 40,
  },
  opButton: {
    width: 90,
    height: 90,
    backgroundColor: 'black',
  },
  row: {
    flexDirection: 'row',
  },
  bottom: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 0,
  },
});
