import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";

export default function Upcoming() {
  const [items, setItems] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");

  const toggleDone = (id) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it))
    );

  const addItem = () => {
    if (!newTitle.trim() || !newDate.trim()) return;
    setItems((prev) => [
      ...prev,
      { id: String(Date.now()), title: newTitle, date: newDate, done: false },
    ]);
    setNewTitle("");
    setNewDate("");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Upcoming</Text>
      </View>

      {/* Input fields */}
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Task..."
          value={newTitle}
          onChangeText={setNewTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Date..."
          value={newDate}
          onChangeText={setNewDate}
          style={styles.input}
        />
        <Pressable onPress={addItem} style={styles.addBtn}>
          <Text style={styles.addBtnPlus}>＋</Text>
        </Pressable>
      </View>

      {/* Items */}
      {items.map((item) => (
        <View key={item.id} style={styles.row}>
          <Pressable
            onPress={() => toggleDone(item.id)}
            style={[styles.checkbox, item.done && styles.checkboxChecked]}
          >
            {item.done && <Text style={styles.checkmark}>✓</Text>}
          </Pressable>
          <Text style={[styles.text, item.done && styles.textDone]}>
            {item.title} on {item.date}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#E7E7DD", padding: 16, borderRadius: 10 },
  header: { marginBottom: 10 },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#111" },
  inputRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#999",
    marginRight: 6,
    paddingVertical: 2,
  },
  addBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  addBtnPlus: { color: "#E7E7DD", fontSize: 18 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkboxChecked: { backgroundColor: "#111" },
  checkmark: { color: "#E7E7DD", fontSize: 14, fontWeight: "700" },
  text: { fontSize: 16, color: "#111" },
  textDone: { textDecorationLine: "line-through", color: "#666" },
});

