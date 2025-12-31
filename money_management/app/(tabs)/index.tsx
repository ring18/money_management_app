// 例: app/(tabs)/index.tsx
import React, { useEffect, useState } from 'react';
import { Button, TextInput, View, Text } from 'react-native';

export default function MoneyScreen() {
  const [amount, setAmount] = useState('');
  const [current, setCurrent] = useState(0);

  // 現在の所持金を取得
  useEffect(() => {
    fetch('http://127.0.0.1:8000/money')
      .then(res => res.json())
      .then(data => setCurrent(data.amount));
  }, []);

  // 所持金を更新
  const updateMoney = (mode: string) => {
    fetch('http://127.0.0.1:8000/money', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Number(amount), mode }),
    })
      .then(res => res.json())
      .then(data => setCurrent(data.amount));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 14, color: '#555' }}>現在の所持金:</Text>
        <Text style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 16 }}>{current}円</Text>
        <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="金額を入力"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, width: 200, marginVertical: 12 }}
        />
        <Button title="In" onPress={() => updateMoney("add")} />
        <Button title="Out" onPress={() => updateMoney("subtract")} />
    </View>
);
}