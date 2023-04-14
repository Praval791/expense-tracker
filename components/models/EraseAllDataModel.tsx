import { TouchableOpacity, View, Text, Modal } from "react-native";
import { useRef } from "react";
import { theme } from "../../themes";

const EraseAllDataModel = ({ showModal, setShowModal }) => {
  const card = useRef([]);
  const handleEraseData = () => {
    setShowModal(false);
  };
  return (
    <Modal
      transparent
      visible={showModal}
      animationType="fade"
      onRequestClose={() => setShowModal(false)}
    >
      <View // background
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.transparentBackground,
        }}
        onStartShouldSetResponder={() => true}
        onResponderStart={(e) => {
          !card.current.includes(e.target) && setShowModal(false);
        }}
      >
        <View // card
          style={{
            width: "60%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.card,
            overflow: "hidden",
            borderRadius: 12,
            height: 120,
          }}
        >
          <View // card top
            style={{
              gap: 2,
              width: "100%",
              flex: 2,
              borderBottomColor: theme.colors.border,
              borderBottomWidth: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                color: theme.colors.text,
              }}
              ref={(ref) => (card.current[0] = ref)}
            >
              Are You Sure?
            </Text>
            <Text
              style={{
                textAlign: "center",

                color: theme.colors.text,
              }}
              ref={(ref) => (card.current[1] = ref)}
            >
              This action cannot be undone.
            </Text>
          </View>
          <View // card bottom
            style={{
              flexDirection: "row",
              width: "100%",
              flex: 1,
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                borderRightColor: theme.colors.border,
                borderRightWidth: 0.5,
              }}
              onPress={() => setShowModal(false)}
            >
              <Text
                style={{
                  color: theme.colors.primary,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                borderLeftColor: theme.colors.border,
                borderLeftWidth: 0.5,
              }}
              onPress={handleEraseData}
            >
              <Text
                style={{
                  color: theme.colors.error,
                }}
              >
                Erase Data
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EraseAllDataModel;
