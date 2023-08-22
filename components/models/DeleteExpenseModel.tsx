import { TouchableOpacity, View, Text, Modal } from "react-native";
import { useRef } from "react";
import { theme } from "../../themes";

const DeleteExpenseModel = ({
  showModal,
  setShowModal,
  deleteExpense,
  setSelectedExpense,
}) => {
  const card = useRef([]);
  const handleDelete = () => {
    deleteExpense();
    setShowModal(false);
  };
  const handleCancel = () => {
    setSelectedExpense(undefined);
    setShowModal(false);
  };
  return (
    <Modal
      transparent
      visible={showModal}
      animationType="fade"
      onRequestClose={() => handleCancel()}
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
          !card.current.includes(e.target) && handleCancel();
        }}
      >
        <View // card
          style={{
            width: "70%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.card,
            overflow: "hidden",
            borderRadius: 12,
            height: 140,
          }}
        >
          <View // card top
            style={{
              width: "100%",
              flex: 5,
              gap: 10,
              paddingHorizontal: 10,
              borderBottomColor: theme.colors.border,
              borderBottomWidth: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 22,
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
                fontSize: 16,
                color: theme.colors.text,
                // letterSpacing: 0.5,
                lineHeight: 20,
              }}
              ref={(ref) => (card.current[1] = ref)}
            >
              This action cannot be undone. This will permanently delete this
              expense.
            </Text>
          </View>
          <View // card bottom
            style={{
              flexDirection: "row",
              width: "100%",
              flex: 2,
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
              onPress={() => handleCancel()}
            >
              <Text
                style={{
                  fontSize: 18,

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
              onPress={handleDelete}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: theme.colors.error,
                }}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteExpenseModel;
