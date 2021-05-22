import React, { useCallback, useState } from 'react';

export default () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const AUI = useCallback(() => {
    return (
      <div>
        <div>ａ：{a}</div>
        <div>ｂ：{b}</div>
      </div>
    )
  }, [a])

  const BUI = useCallback(() => {
    return (
      <div>
        <div>ａ：{a}</div>
        <div>ｂ：{b}</div>
      </div>
    )
  }, [b])

  setTimeout(() => {
    setA(a + 1)
  }, 2000)

  setTimeout(() => {
    setB(b + 1)
  }, 1000)

  return (
    <div>
      <AUI />
      <BUI />
    </div>
  )
}