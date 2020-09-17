import org.junit.Test;
import static org.junit.Assert.*;

public class JunitTesting {

    public static int addition(int x, int y){
        return( x +  y);
    }
    @Test
    public void test1() {
    assertEquals(7, addition(3, 4));
    }

    @Test
    public void test2(){
        assertEquals(250, addition(100,150));
    }

    @Test
    public void test3(){
        assertEquals(176, addition(150,26));
    }

}
